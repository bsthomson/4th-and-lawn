import React, { Component } from 'react';
import Signup from './../form-sign-up/sign-up';
import Modal from 'react-modal';


class SignUpModal extends Component {
    
    state = {
        modalIsOpen: false
      };
   
    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);

    openModal() {
        this.setState({modalIsOpen: true});
      }
     
    afterOpenModal() {
    // references are now sync'd and can be accessed.
    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div>
                
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                >
                <Signup updateUser={this.props.updateUser}/>
                </Modal>
            </div>
        )
    }    
}

export default SignUpModal
