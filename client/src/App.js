import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as 
  Router, 
  Route, 
  Switch 
} from 'react-router-dom';
import Navbar from './components/Navigation/Nav.js';
import Home from './pages/Home';
import ParkingSpots from './pages/ParkingSpots';
import UserSpots from './pages/UserSpots';
import NoMatch from './pages/NoMatch';
import RentThisSpot from "./pages/RentThisSpot";
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import './App.css';


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
            <Route render={({location}) => (
            <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={0}
              classNames="fade"
              >
                <Switch location={location}>
                  {/* greet user if logged in: */}
                  {this.state.loggedIn &&
                    <p>Join the party, {this.state.firstname}!</p> &&
                    console.log("firstname: " + this.state.firstname)
                  }
                  {/* Routes to different components */}
                  <Route
                    exact path="/"
                    component={() => <Home loggedIn={this.state.loggedIn} />}
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
              </CSSTransition>
              </TransitionGroup>
            )} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
