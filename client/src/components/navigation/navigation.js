import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import Modal from 'react-modal';
import Signup from './../form-sign-up/sign-up';

import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)

        this.state = {
            modalIsOpen: false
          };
       
          this.openModal = this.openModal.bind(this);
          this.afterOpenModal = this.afterOpenModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }


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

        const { match } = this.props;

        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <section className="navigation">

                <nav className="navigation__nav">
                    {loggedIn ? (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="#" className="navigation__link" onClick={this.logout}>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link">
                                    <span>Parking spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="" className="navigation__link" onClick={this.openModal}>
                                    Sign up
                                </Link>
                            </li>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                contentLabel="Example Modal"
                            >
                            <Signup />
                            </Modal>
                            <li className="navigation__item">
                                <Link to="/login" className="navigation__link">
                                    <span>Log in</span>
                                </Link>
                            </li>
                            
                        </ul>
                    )}
                </nav>
            </section>
        );
    }
}

export default Navbar