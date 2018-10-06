import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// components
import Signup from './components/user-sign-up/sign-up'
import LoginForm from './components/user-login/login-form'
import Navbar from './components/navigation/navigation'
import Home from './components/home/home'

// Modal
import { ModalContainer } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      firstname: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/register').then(response => {
      console.log('Get user response: ')
      console.log(response)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          firstname: response.data.user.firstname
        })

      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          firstname: null
        })
      }
    })
  }

  render() {

    return (
      <div className="App">
   
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.firstname}!</p> &&
          console.log("firstname: " + this.state.firstname)
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
            updateUser={this.updateUser}
            />
          }
        />
       
        <ModalContainer />
      </div>
    );
  }
}

export default App;
