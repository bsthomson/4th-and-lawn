import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../App.css';
import axios from 'axios';
import PostParkingSpot from './../../components/FormPostParking/PostParking';
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

    componentDidUpdate() {
        console.log(this.state)
    }

    componentDidMount() {
        this.loadPostedSpots();
        this.loadRentedSpots();
    }

    loadPostedSpots = () => {
        axios.get("/api/postedspots")
            .then(response => this.setState({             
                postedspots: response.data[0].parkingspots
            }))
            .catch(err => console.log(err));
    };

    loadRentedSpots = () => {
        axios.get("/api/rentedspots")
            .then(response => this.setState({             
                rentedspots: response.data[0].rentinfo
            }))
            .catch(err => console.log(err));
    };

    deletePostedSpot = id => {
        axios.delete("/api/postedspots/" + id)
        .then(response => this.loadPostedSpots())
        .catch(err => console.log(err));
    }

    deleteRentedSpot = id => {
        axios.delete("/api/rentedspots/" + id)
        .then(response => this.loadRentedSpots())
        .catch(err => console.log(err));
    }

    render() {
        return (
            <section>
            {/* <div className="section-header"></div> */}
            <div className="section-dashboard">
                
                <div className="dashboard__container">

                    <section  className="parking__header">
                        <div className="parking__heading">
                            <h1 className="heading-primary">
                                <span className="heading-primary--page">Dashboard</span>
                            </h1>
                        </div>
                    </section>

                    {/* SIDEBARD -> */}
                    {/* <section className="dashboard__sidebar">
                        <h1 className="heading-primary">
                            <span className="heading-primary--white">Dashboard</span>
                        </h1>
                        <ul className="dashboard__sidebar-links">
                            <li className="dashboard-heading--item">
                                <i className="fas fa-user-circle spot--icon-sidebar"></i> Account
                            </li>
                            <li className="dashboard-heading--item">
                                <i className="far fa-credit-card spot--icon-sidebar"></i> Payments
                            </li>
                            <li className="dashboard-heading--item">
                                <i className="fas fa-envelope spot--icon-sidebar"></i> Invite Friends
                            </li>
                            <li className="dashboard-heading--item">
                                <i className="fas fa-cog spot--icon-sidebar"></i> Settings
                            </li>
                        </ul>
                    </section> */}
                    {/* SIDEBAR END ^ */}
                    <div className="dashboard__create">
                    <Popup trigger={<span className="btn btn--card">Create Parking Spot</span>} modal>
                            {close => (
                            <div className="modal">
                                <a href="#" className="popup__close" onClick={close} >
                                &times;
                                </a>
                                    
                                <PostParkingSpot />
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
                    </div>
                    
                    
                    {/* START USER CONTENT */}
                    <section className="dashboard__content">

                        <div className="row">
                            <div className="col-1-of-2">
                                <section className="dashboard__user-section">
                                    <span className="dashboard-heading--title">Parking spots</span>
                                    {/* <span className="dashboard-heading--btn"></span> */}
                                    
                                    {/* START -> */}
                                    {this.state.postedspots.length ? (
                                        <div>
                                            {this.state.postedspots.map(postedspot => (
                                                <section key={postedspot._id}>
                                                    <div className="dashboard__user-item">
                                                        <div className="dashboard__user-address">
                                                            <span className="dashboard-heading--value">{postedspot.streetaddress}</span>
                                                        </div>
                                                        <div className="dashboard__user-buttons">
                                                            <Link to={"/rentthisspot/" + postedspot._id}>
                                                                <div className="dashboard-card__button dashboard-card__button--link" >
                                                                    <span className="spot--test"><i className="fas fa-home spot--icon"></i></span>
                                                                </div>
                                                            </Link>
                                                            <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => this.deletePostedSpot(postedspot._id)}>
                                                                <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
                                                            </div>      
                                                        </div>
                                                    </div>
                                                </section>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="dashboard__user-item">
                                            <div className="dashboard__user-empty">
                                                 <span className="dashboard-heading--value">You haven't listed any spots.</span>
                                             </div>
                                        </div>
                                    )}
                                    {/* END ^ */}

                                </section>
                            </div>

                            <div className="col-1-of-2">
                                <section className="dashboard__user-section">
                                    <span className="dashboard-heading--title">Rented Spots</span>

                                        {/* START -> */}
                                        {this.state.rentedspots.length ? (
                                            <div>
                                                {this.state.rentedspots.map(rentedspot => (
                                                    <section key={rentedspot._id}>
                                                        <div className="dashboard__user-item">
                                                            <div className="dashboard__user-address">
                                                                <span className="dashboard-heading--value">{rentedspot.make} {rentedspot.model} / {rentedspot.licenseplate}</span>
                                                            </div>
                                                            <div className="dashboard__user-buttons">
                                                                <Link to={"/rentthisspot/" + rentedspot._id}>
                                                                    <div className="dashboard-card__button dashboard-card__button--link" >
                                                                        <span className="spot--test"><i className="fas fa-home spot--icon"></i></span>
                                                                    </div>
                                                                </Link>
                                                                <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => this.deleteRentedSpot(rentedspot._id)}>
                                                                    <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
                                                                </div>      
                                                            </div>
                                                        </div>
                                                    </section>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="dashboard__user-item">
                                                <div className="dashboard__user-empty">
                                                    <span className="dashboard-heading--value">You haven't rented any spots.</span>
                                                </div>
                                            </div>
                                        )}
                                        {/* END ^ */}

                                </section>
                            </div>

                            


                        </div>

                        
                    </section>
                    {/* END DASHBOARD USER CONTENT */}

                </div>
            </div>
            </section>
        );
    }
}

export default UserSpot;