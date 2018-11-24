import React, { Component } from "react";
import './../../App.css';
import axios from 'axios';
import PostParkingSpot from './../../components/FormPostParking/PostParking';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom'
import { resolve } from "url";
import API from "../../utils/API"

import PostedSpotCard from './Posted/PostedSpotCard';
import RentedSpotCard from './Rented/RentedSpotCard';

class UserSpot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: this.props.loggedIn,
            postedspots: [],
            rentedspots: []
        };
    }

    componentDidMount() {
        this.loadPostedSpots();
        this.loadRentedSpots();
    }

    loadPostedSpots = () => {
        axios.get("/api/postedspots")
            .then(response => {
                console.log({ response })

                this.setState({
                    postedspots: response.data
                })
            })
            .catch(err => console.log(err));
    };

    loadRentedSpots = () => {
        axios.get("/api/rentedspots")
            .then(response => {
                let eventPromises = [];
                let spotPromises = [];

                console.log({ rentinfo: response.data[0].rentinfo });

                response.data[0].rentinfo.forEach(rentedSpot => {
                    eventPromises.push(
                        axios.get('/api/event/' + rentedSpot.event, resolve)
                    );

                    spotPromises.push(
                        axios.get('/api/parkingSpots/' + rentedSpot.parkingspot[0], resolve)
                    );
                })

                Promise.all(eventPromises)
                    .then(events => {
                        Promise.all(spotPromises)
                            .then(spots => {
                                this.setState({
                                    rentedspots:
                                        events.map((item, idx) => {
                                            item.data.address = spots[idx].data.streetaddress;
                                            item.data._renterId = spots[idx].data.rentinfo[idx];
                                            return item.data;
                                        })
                                }, () => {
                                    console.log({ rentedSpot: this.state.rentedspots });
                                })
                            })
                    })
            })
            .catch(err => console.log(err));
    };

    deletePostedSpot = id => {
        API.deleteParkingSpot(id)
            .then(response => this.loadPostedSpots())
            .catch(err => console.log(err));
    }

    deleteRentedSpot = id => {
        console.log(id)
        API.deleteRentedSpot(id)
            .then(response => this.loadRentedSpots())
            .catch(err => console.log(err));
    }

    render() {
        console.log({
            state: this.state
        });

        return (
            <section>
                {/* <div className="section-header"></div> */}
                <div className="section-dashboard">

                    <div className="dashboard__container">

                        <section className="dashboard__header">
                            <div className="parking__heading">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--page-white">Dashboard</span>
                                </h1>
                            </div>
                        </section>

                        {/* START USER CONTENT */}
                        <section className="dashboard__content">

                            <div className="row">
                                <div className="col-1-of-2">
                                    <Popup trigger={<span className="btn btn--card">List Parking Spot</span>} modal>
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
                                    <section className="dashboard__user-section">
                                        <span className="dashboard-heading--title">Parking spots</span>
                                        {/* <span className="dashboard-heading--btn"></span> */}

                                        {/* START -> */}
                                        {this.state.postedspots.length ? (
                                            <div>
                                                {this.state.postedspots.map(postedSpot => (
                                                    <PostedSpotCard
                                                        _id={postedSpot._id}
                                                        address={postedSpot.streetaddress}
                                                        renter={postedSpot.renter}
                                                        deleteSpot={this.deletePostedSpot} />
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
                                    <Popup trigger={<span className="btn btn--card">Rent Parking Spot</span>}>
                                        <Redirect to={{ pathname: 'parking-spots' }} />
                                    </Popup>
                                    <section className="dashboard__user-section">
                                        <span className="dashboard-heading--title">Rented Spots</span>

                                        {/* START -> */}
                                        {this.state.rentedspots.length ? (
                                            <div>
                                                {this.state.rentedspots.map((rentedSpot, idx) => (
                                                    <RentedSpotCard
                                                        _id={rentedSpot._renterId}
                                                        date={rentedSpot.date}
                                                        shortName={rentedSpot.shortName}
                                                        address={rentedSpot.address}
                                                        deleteRented={this.deleteRentedSpot}
                                                    />
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