import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../App.css';
import axios from 'axios';
import Popup from 'reactjs-popup';

class UserSpot extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loggedIn: false,
          postedspots: [],
          rentedspots: []
        };
      }

    componentDidMount() {
        console.log("********",this.props.loggedIn);
        if (this.props.loggedIn === false) {
            this.setState({
                loggedIn: false
            })
        } else {
            this.setState ({
                loggedIn: true
            })
        }
    }


    componentDidMount() {
        this.loadPostedSpots();
    }

    loadPostedSpots = () => {
        axios.get("/api/postedspots")
            .then(response => this.setState({             
                postedspots: response.data[0].parkingspots
            }))
            .catch(err => console.log(err));
    };

    deletePostedSpot = id => {
        axios.delete("/api/postedspots/" + id)
        .then(response => this.loadPostedSpots())
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="section-dashboard">
                <div className="dashboard__sidebar">
                    <div className="dashboard__container">
                        <h1 className="heading-primary">
                            <span className="heading-primary--form-white">Dashboard</span>
                        </h1>

                        <div className="dashboard__sidebar-links">
                            <p className="dashboard-heading--sidebar"><i className="fas fa-user-circle spot--icon-sidebar"></i>Account</p>
                            <p className="dashboard-heading--sidebar"><i className="far fa-credit-card spot--icon-sidebar"></i>Payments</p>
                            <p className="dashboard-heading--sidebar"><i className="fas fa-envelope spot--icon-sidebar"></i>Invite Friends</p>
                            <p className="dashboard-heading--sidebar"><i className="fas fa-cog spot--icon-sidebar"></i>Settings</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard__main">
                    <div className="row">
                        <div className="col-1-of-1">
                        
                            <div className="dashboard__container">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--form">Parking spots</span>
                                    <span className="dashboard-primary--body">These are your listings.</span>
                                </h1>

                                <div className="dashboard__section">
                                    {this.state.postedspots.length ? (
                                        <div className="row">
                                            {this.state.postedspots.map(postedspot => (
                                                <div className="col-1-of-1" key={postedspot._id}>

                                                <hr className="dashboard-break" />

                                                        <div className="col-1-of-3">
                                                            <div className="listing-container">
                                                                <p className="dashboard-heading--value">{postedspot.streetaddress}</p>
                                                            </div>         
                                                        </div>

                                                        <div className="col-1-of-3">
                                                            <div className="listing-container">
                                                                <p className="dashboard-heading--value">{postedspot.event[0]}</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-1-of-3">
                                                            <div className="listing-container">

                                                                <Link to={"/rentthisspot/" + postedspot._id}>
                                                                    <div className="dashboard-card__button dashboard-card__button--link" >
                                                                        <span className="spot--test"><i class="fas fa-home spot--icon"></i></span>
                                                                    </div>
                                                                </Link>

                                                                <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => this.deletePostedSpot(postedspot._id)}>
                                                                    <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
                                                                </div>

                                                            </div>         
                                                        </div>

                                                        

                                                </div>
                                                
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="dashboard__container-absolute">
                                            <h3>No Results to Display</h3>
                                        </div>
                                    )}

                            
                                </div>
                            </div>
                        </div>

                    <div className="col-1-of-1">
                        <div className="dashboard__container">
                            <h1 className="heading-primary">
                                <span className="heading-primary--form">Rented spots</span>
                                <span className="dashboard-primary--body">These are your reserved spots. Enjoy the game.</span>
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}

export default UserSpot;
