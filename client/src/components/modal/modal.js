import React, { Component } from 'react';
import Signup from './../user-sign-up/sign-up'

// Modal
import { Modal, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

class LoginModal extends Component{

  render() {
    return (
      <div>
       
          <Signup/>
      
      </div>
    );
  }
}

export default LoginModal