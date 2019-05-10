import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { ModalForm, ModalDelete } from '../components/index';
import UserService from '../services/user.service';


export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listarUser: [],
            modalform: false,
            modaldelete: false,
            create: true,
            edit: true,
            title:'',
            toggle: () => { this.toggle() },
            toggleDelete: () => { this.toggleDelete() },
            listarUsers: () => { this.listarUser() },
            dataUser: { firstname: '', lastname: '', email: '', birthdate: '' }

        }
        this.userService= new UserService()
        this.listarUser = this.listarUser.bind(this)
        this.toggle = this.toggle.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
        this.createUser = this.createUser.bind(this)

    }

    componentDidMount() {
        this.listarUser()
    }

    toggle() {
        this.setState(prevState => ({
            modalform: !prevState.modalform
        }));
    }

    toggleDelete() {
        this.setState(prevState => ({
            modaldelete: !prevState.modaldelete
        }));
    }

    deleteUser(dataUser) {
        this.setState({ dataUser: dataUser, title: `Delete User ${dataUser.firstname} ${dataUser.lastname}` })
        this.toggleDelete()
    }

    createUser() {
        this.setState({ 
            dataUser: { firstname: '', lastname: '', email: '', birthdate: '' }, 
            create: false, 
            edit: true,
            title:'Create User'
        })
        this.toggle()
    } 

    updateUser(dataUser) {
       
        this.setState({ 
            dataUser: dataUser, 
            create: true, 
            edit: false,
            title:'Edit User'
        })
        this.toggle()
    }


    listarUser() {

        this.userService.getAll()
            .then(res=>{
                this.setState({ listarUser: res.data })
            })
            .catch(error=>{
                console.log(error)
            })

    }

    render() {
        return (
            <div>
                <h2 className="mb-4">Users</h2>
                <div className="text-right mb-3">
                <Button color="success" onClick={() => { this.createUser() }} size="sm" active>Create User</Button>

                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Birthdate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listarUser.map(function (i, index) {
                            return <tr key={index}>
                                <td>{i.firstname}</td>
                                <td>{i.lastname}</td>
                                <td>{i.email}</td>
                                <td>{i.birthdate}</td>
                                <td>
                                    <Button color="info" onClick={this.updateUser.bind(this,i)}>Edit</Button>{' '}
                                    <Button color="danger" onClick={this.deleteUser.bind(this, i)}>Delete</Button>
                                </td>
                                
                            </tr>
                        }.bind(this))}
                    </tbody>
                </Table>
                <ModalForm {...this.state} />
                <ModalDelete {...this.state} />
            </div>
        )
    }

}