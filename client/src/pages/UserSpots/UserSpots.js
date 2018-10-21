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

                            {/* START */}
                            {this.state.postedspots.length ? (
                                <div className="row">
                                    {this.state.postedspots.map(postedspot => (
                                            <div className="col-1-of-1" key={postedspot._id}>
                                                {/* START CARD -> */}
                                                <div className="dashboard-card">
                                                    <div className="dashboard-card__container">
                                                        <div className="row">

                                                            <div className="col-1-of-3">
                                                                <div className="dashboard-card__container-flex-vertical-align">
                                                                    <p className="spot--address">{postedspot.streetaddress}</p>
                                                                </div>
                                                            </div>

                                                            <div className="col-1-of-3">
                                                                <div className="dashboard-card__container-flex-vertical-align">
                                                                    <p className="spot--address">{postedspot.event[0]}</p>
                                                                </div>
                                                            </div>

                                                            <div className="col-1-of-3">
                                                                <div className="dashboard-card__container-flex-vertical-align-icon">
                                                                    <Link to={"/rentthisspot/" + postedspot._id}>
                                                                        <div className="btn btn--spot" >
                                                                            <i class="fas fa-home spot--icon"></i>
                                                                        </div>
                                                                    </Link>
                                                                </div> 
                                                                <div className="dashboard-card__container-flex-vertical-align-icon">
                                                                    <div className="btn btn--delete" onClick={() => this.deletePostedSpot(postedspot._id)}>
                                                                        <i class="fas fa-trash-alt spot--icon"></i>
                                                                    </div>
                                                                    {/* <Popup trigger={<span className="navigation__link">Sign up</span>}>
                                                                        <div className="modal">
                                                                            Test
                                                                        </div>
                                                                    </Popup> */}
                                                                </div>                          
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                                {/* ^ END CARD ^ */}

                                            </div>
                                    ))}
                                </div>

                            ) : (
                            <h3>No Results to Display</h3>
                            )}
                            {/* END */}
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
