import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import ValidateForm from './../FormSignUp/Validate';
import Login  from './../FormLogin/Login';
import { Redirect } from "react-router-dom";
import Signup from './../FormSignUp/SignUp';

import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)

        this.state = {
            redirectTo: null,
            menuOpen: false,
        }
    }

    // closeMobile.click( () => {
    //     navButton.trigger('click');
    // });
    componentDidUpdate() {
        console.log(this.state)
    }

    logout(event) {
        event.preventDefault()
        console.log("logging out")
        axios.post('/logout').then(response => {
            console.log("logging out part 2")
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              menuOpen: false,
              email: null
            })
            this.setState({
                // redirectTo: '/',
                menuOpen: false
            })
          }
        }).catch(error => {
            console.log('Logout Error')
        })
    }

    toggleMenu() {
        this.setState({menuOpen: !this.state.menuOpen});
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to ={{ pathname: this.state.redirectTo }} />
        } else {

        const loggedIn = this.props.loggedIn;
        
        return (
            <section className="navigation">
                <div className="navigation__nav-container">

                <div class="navigation__logo-box">
                    <Link to="/" className="navigation__logo" onClick={(e)=>{this.setState({menuOpen: false})}}>
                        <div class="navigation__logo"><i className="fas fa-car margin-right"></i>fourth&lawn</div>
                    </Link>
                </div>

                <input type="checkbox" className="navigation__checkbox" id="navi-toggle" checked={this.state.menuOpen} onChange={this.toggleMenu.bind(this)}/>
                
                <label htmlFor="navi-toggle" className="navigation__button">
                    <span className="navigation__icon">&nbsp;</span>
                </label>
                
                <div className="navigation__background">
                    &nbsp;
                </div>

                
                <nav className="navigation__nav">
                    {loggedIn ? (
                        <ul className="navigation__list">
                            <li className="navigation__item">
                                <Link to="/" className="navigation__link" onClick={(e)=>{this.setState({menuOpen: false})}}>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/spots-dashboard" className="navigation__link" onClick={(e)=>{this.setState({menuOpen: false})}}> 
                                    <span>My Spots</span>
                                </Link>
                            </li>
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link" onClick={(e)=>{this.setState({menuOpen: false})}}>
                                    <span>Parking Spots</span>
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
                                <Link to="/" className="navigation__link" onClick={(e)=>{this.setState({menuOpen: false})}}>
                                    <span>Home</span>
                                </Link>
                            </li>
                            
                            <li className="navigation__item">
                                <Link to="/parking-spots" className="navigation__link" onClick={(e)=>{this.setState({menuOpen: false})}}>
                                    <span>Parking Spots</span>
                                </Link>
                            </li>

                            
                            <li className="navigation__item">
                            <Popup trigger={<span className="navigation__link">Sign up</span>} modal>
                                {close => (
                                <div className="modal">
                                    <a href="#" className="popup__close" onClick={close} >
                                    &times;
                                    </a>
                                    
                                    <Signup updateUser={this.props.updateUser}/>
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
               
                </div>
            </section>
        )};
    }
}

export default Navbar