import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Signup from './components/Form-Sign-Up/SignUp';
import LoginForm from './components/Form-Login/Login';
import Navbar from './components/Navigation/Nav';
import Home from './pages/Home';
import ParkingSpots from './pages/ParkingSpots';
import UserSpots from './pages/UserSpots';
import NoMatch from './pages/NoMatch';
import RentThisSpot from "./pages/RentThisSpot";


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      firstname: null,
      email: null
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
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          firstname: response.data.user.firstname,
          email: response.data.user.email
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
        <Router>
          <div>
            <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
              <Switch>
                {/* greet user if logged in: */}
                {this.state.loggedIn &&
                  <p>Join the party, {this.state.firstname}!</p> &&
                  console.log("firstname: " + this.state.firstname)
                }
                {/* Routes to different components */}
                <Route
                  exact path="/"
                  component={Home} 
                />
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
                    />}
                />
                <Route
                    path="/rentthisspot"
                    component={RentThisSpot}
                />
                <Route
                  path="/parking-spots"
                  component={ParkingSpots}
                />
                <Route
                  path="/posted-spots"
                  component={UserSpots}
                />
                <Route component={NoMatch} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
