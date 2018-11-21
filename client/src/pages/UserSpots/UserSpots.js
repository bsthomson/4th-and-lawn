import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../App.css';
import axios from 'axios';
import PostParkingSpot from './../../components/FormPostParking/PostParking';
import ViewParkingSpot from './../../components/ViewParking/ViewParkingSpot';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom'
import { resolve } from "url";
import moment from "moment";
import API from "../../utils/API"


class UserSpot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: this.props.loggedIn,
            postedspots: [],
            rentedspots: []
        };
    }

    // componentDidMount() {
    //     console.log("********", this.props.loggedIn);
    //     this.setState({
    //         loggedIn: this.props.loggedIn
    //     })
    // }

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
                console.log({
                    loadRented: response.data.rentinfo
                })

                let eventPromises = [];
                let spotPromises = [];
                response.data[0].rentinfo.forEach(rentedSpot => {
                    console.log({
                        rentedSpot
                    })
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
                                            return item.data;
                                        })
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
                                                                <Popup trigger={
                                                                    <div className="dashboard-card__button dashboard-card__button--view" onClick={() => this.viewPostedSpot(postedspot._id)}>
                                                                        <span className="spot--test"><i class="far fa-eye spot--icon"></i></span>
                                                                    </div>
                                                                } modal>
                                                                    {close => (
                                                                        <div className="modal">
                                                                            <a href="#" className="popup__close" onClick={close} >
                                                                                &times;
                                                                            </a>

                                                                            <ViewParkingSpot renters={postedspot.renter} />
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
                                    <Popup trigger={<span className="btn btn--card">Rent Parking Spot</span>}>
                                        <Redirect to={{ pathname: 'parking-spots' }} />
                                    </Popup>
                                    <section className="dashboard__user-section">
                                        <span className="dashboard-heading--title">Rented Spots</span>

                                        {/* START -> */}
                                        {this.state.rentedspots.length ? (
                                            <div>
                                                {this.state.rentedspots.map(rentedspot => (
                                                    <section key={rentedspot._id}>
                                                        <div className="dashboard__user-item">
                                                            <div className="dashboard__user-address">
                                                                <div className="row" style={{ color: "white" }}>
                                                                    <div className="col-1-of-5">
                                                                        <h2>{moment(rentedspot.date).format("hh:mm a")}</h2>
                                                                    </div>
                                                                    <div className="col-1-of-4">
                                                                        <h2>{moment(rentedspot.date).format("MM-DD-YYYY")}</h2>
                                                                    </div>
                                                                    <div className="col-1-of-2">
                                                                        <span className="dashboard-heading--value">{rentedspot.shortName}</span> <br></br>
                                                                        <span className="dashboard-heading--value">{rentedspot.address}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="dashboard__user-buttons">
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