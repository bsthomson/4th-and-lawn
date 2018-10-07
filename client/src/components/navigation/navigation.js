import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import { Modal, ModalRoute } from 'react-router-modal'
import Signup from './../form-sign-up/sign-up'
import PostParkingSpot from './../form-post-parking/post-parking'

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

      state = { show: false }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <section>

                <nav class="navigation__nav">
                    {loggedIn ? (
                        <ul class="navigation__list">
                            <li class="navigation__item">
                                <Link to="#" className="navigation__link" onClick={this.logout}>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul class="navigation__list">
                            <li class="navigation__item">
                                <Link to="/" className="navigation__link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li class="navigation__item">
                                <Link to="/login" className="navigation__link">
                                    <span>Login</span>
                                </Link>
                            </li>

                            <li class="navigation__item">
                                <Link to={`/`} className="navigation__link">
                                    <span onClick={() => this.setState({show: true})}>Sign up</span>
                                    {this.state.show && (
                                        <Modal onBackdropClick={() => this.setState({show: false})}>
                                            <Signup/>
                                        </Modal>
                                    )}
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