import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Signup from './../FormSignUp/SignUp';
import Login  from './../FormLogin/Login';
import ValidateForm  from './../FormSignUp/Validate';

import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        
    }

    // closeMobile.click( () => {
    //     navButton.trigger('click');
    // });

    logout(event) {
        event.preventDefault()
        axios.post('/logout').then(response => {
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout Error')
        })
    }

    render() {

        const loggedIn = this.props.loggedIn;
        
        return (
            <section className="navigation">

                <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />
                
                <label for="navi-toggle" class="navigation__button">
                    <span class="navigation__icon">&nbsp;</span>
                </label>
                
                <div class="navigation__background">
                    &nbsp;
                </div>

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
                                <span className="navigation__link" onClick={this.logout}>
                                    Logout
                                </span>
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
                                <Popup trigger={<span className="navigation__link">Sign up</span>}>
                                    <div className="modal">
                                        <Signup updateUser={this.props.updateUser}/>
                                    </div>
                                </Popup>
                            </li>
                            <li className="navigation__item">
                                <Popup trigger={<span className="navigation__link">Log in</span>} modal>
                                {close => (
                                <div className="modal">
                                    <a href="#" className="popup__close" onClick={close} >
                                    &times;
                                    </a>
                                    
                                    <Login updateUser={this.props.updateUser}/>
                                    <button
                                        className="button"
                                        onClick={() => {
                                        console.log('Modal Closed')
                                        close()
                                        }}
                                    >
                                    </button>
                                </div>
                                )}
                                </Popup>
                            </li>
                        </ul>
                    )}
                </nav>
            </section>
        );
    }
}

export default Navbar