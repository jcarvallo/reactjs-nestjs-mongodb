import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import UserService from '../services/user.service';

export class ModalForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            errors: {}
        }

        this.userService = new UserService();
        this.close = this.close.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.create = this.create.bind(this)
        this.validatorForm = this.validatorForm.bind(this)
    }

    close() {
        this.setState({startDate: '',errors: {}});
        this.props.toggle()
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState({ [name]: value });

        this.validatorForm()
    }

    handleChangecker(date) {
        this.setState({ startDate: date, birthdate: moment(date).format('DD/MM/YYYY') });
    }

    validatorInput(values) {

        let error = {}

        for (let [key, value] of Object.entries(values)) {
            if (!value){ 
                error[key] = 'Required field';
            } else if (key === 'email'){
                let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
                    if(!emailRegex.test(value))
                    {
                        error[key] = 'Invalid email';
                    }
            }
        }  

        return error;
    }

    validatorForm(){
        const { errors, ...sinErrors } = this.state
        const validator = this.validatorInput(sinErrors)
        this.setState({ errors: validator })

        return validator;
    }

    create() {
        try {
            let validator=this.validatorForm()
            if (!Object.keys(validator).length) {
                this.userService.createUser(this.state)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.listarUsers()
                            this.close()
                            toast.success(`${res.data.messeger}`);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })

            }

        } catch (error) {
            console.log(error)
        }


    }
    update(userId) {

        try {
            let validator = this.validatorForm()
            if (!Object.keys(validator).length) {
                this.userService.editUser(userId, this.state)
                    .then(res => {
                        if (res.status === 200) {
                            this.props.listarUsers()
                            this.close()
                            toast.info(`${res.data.messeger}`);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        } catch (error) {
            console.log(error)
        }
    }

    componentWillReceiveProps(newProps) {

        for (let [key, value] of Object.entries(newProps.dataUser)) {
            if (key === 'birthdate') {
                let date = moment(value, 'DD/MM/YYYY')
                this.setState({ startDate: (value!=='') ? date._d : '' })
                
            }
            if (key!=='__v') {
                this.setState({ [key]: value })
            }
            
        }

    }

    render() {

        const title = (this.props.create === false) ? this.props.title : `${this.props.title} ${this.props.dataUser.firstname} ${this.props.dataUser.lastname}`
        const { errors } = this.state;
        return (
            <div>
                <Modal size="md" isOpen={this.props.modalform} toggle={this.close}>
                    <ModalHeader toggle={this.close}>{title}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">First Name</Label>
                                <Input type="text" onChange={this.handleChange} defaultValue={this.props.dataUser.firstname} name="firstname" id="firstname" placeholder="" />
                                {errors.firstname && <p className="error">{errors.firstname}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Last Name</Label>
                                <Input type="text" onChange={this.handleChange} defaultValue={this.props.dataUser.lastname} name="lastname" id="lastname" placeholder="" />
                                {errors.lastname && <p className="error">{errors.lastname}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="text" onChange={this.handleChange} defaultValue={this.props.dataUser.email} name="email" id="email" placeholder="" />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Birthdate</Label><br></br>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChangecker.bind(this)}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                                {errors.birthdate && <p className="error">{errors.birthdate}</p>}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" className="btn-outline plus" onClick={this.close}>Cancel</Button>
                        <Button hidden={this.props.create} color="success" className="btn-outline plus" onClick={() => { this.create() }}>Create User</Button>
                        <Button hidden={this.props.edit} color="info" className="btn-outline plus" onClick={() => { this.update(this.props.dataUser._id) }}>Edit User</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

