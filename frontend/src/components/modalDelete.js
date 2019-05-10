import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserService from '../services/user.service';
import { toast } from 'react-toastify';

export class ModalDelete extends Component {
    
    close() {
        this.props.toggleDelete()
    }
    
    delete(userId){
        try {
        const userService = new UserService();

              userService.deleteUser(userId)
                .then(res=>{
                    console.log(res)
                    if(res.status===200){
                        this.props.listarUsers()
                        this.close()
                        toast.error(`${res.data.messeger}`);
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
           
       } catch (error) {
           console.log(error)
          
       } 
        
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modaldelete} fade={false} toggle={this.close.bind(this)} >
                    <ModalHeader toggle={this.close.bind(this)}>{this.props.title}</ModalHeader>
                    <ModalBody className="text-center">
                        Are you sure to delete this user?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.delete.bind(this,this.props.dataUser._id)}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.close.bind(this)}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

