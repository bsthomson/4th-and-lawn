import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-responsive-modal';
import Signup from './../Form-Sign-Up/SignUp';
import Login  from './../Form-Login/Login';

import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
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

      state = {
        openFirstModal: false,
        openSecondModal: false,
      };

      onOpenFirstModal = () => {
        this.setState({ openFirstModal: true });
      };
    
      onCloseFirstModal = () => {
        this.setState({ openFirstModal: false });
      };
    
      onOpenSecondModal = () => {
        this.setState({ openSecondModal: true });
      };
    
      onCloseSecondModal = () => {
        this.setState({ openSecondModal: false });
      };
    

    render() {

        const loggedIn = this.props.loggedIn;
        const { openFirstModal, openSecondModal } = this.state;
        
        return (
            <section className="navigation">

                <nav className="navigation__nav">
                    {loggedIn ? (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/posted-spots" className="navigation__link">
                                    <span>My Spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link">
                                    <span>Parking spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link" onClick={this.logout}>
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
                                <span className="navigation__link" onClick={this.onOpenFirstModal}>
                                    Sign up
                                </span>
                            </li>

                            <Modal open={openFirstModal} onClose={this.onCloseFirstModal} center>
                                <Signup updateUser={this.props.updateUser}/>
                            </Modal>
                            
                            <li className="navigation__item">
                                <span className="navigation__link" onClick={this.onOpenSecondModal}>
                                    Login
                                </span>
                            </li>

                            <Modal open={openSecondModal} onClose={this.onCloseSecondModal} center>
                                <Login updateUser={this.props.updateUser}/>
                            </Modal>
                        </ul>
                    )}
                </nav>
            </section>
        );
    }
}

export default Navbar