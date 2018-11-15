import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';
import Login from './../../components/FormLogin/Login';
import GoogleMap from './../../components/GoogleMap/GoogleMap';
import axios from 'axios';

import { getGeocode, getWalkingDistance } from '../../utils/Helpers';

class RentThisSpot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSpot: '',
            loggedIn: false,
            distance: ''
        };

        this.getParkingSpot = this.getParkingSpot.bind(this);
    }

    componentDidMount() {
        this.getParkingSpot();
    }

    getParkingSpot = () => {
        axios.get("/api/" + window.location.pathname)
            .then(response => {
                this.setState({
                    selectedSpot: response.data
                });

                let selectedSpot = response.data;
                let geocode = undefined;

                selectedSpot.address = `${selectedSpot.streetaddress}, ${selectedSpot.city}, ${selectedSpot.state} ${selectedSpot.zipcode}`;
                geocode = getGeocode(selectedSpot.address);

                getWalkingDistance(this.state.selectedSpot.address, this.state.selectedSpot.event[0].location)
                    .then(walkingDistance => {
                        this.setState({ distance: walkingDistance });
                    })

                geocode.then(res => {
                    const { lat, lng } = res;

                    selectedSpot.lat = lat;
                    selectedSpot.lng = lng;
                })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <section className="section-renter">

                    <div className="renter-container">

                        <div className="col-1-of-3">

                            <div className="header-renter__title">
                                <div className="header-renter__background">
                                    <h3 className="renter">
                                        <span className="renter--title">{this.state.selectedSpot.streetaddress}</span>
                                        <hr className="rent-break"></hr>
                                        <span className="renter--value">Price per game</span>
                                        <span className="renter--icon"><i className="fas fa-dollar-sign margin-right"></i>{this.state.selectedSpot.price ? this.state.selectedSpot.price : 'N/A'}</span>
                                        {/* <hr className="rent-break"></hr>
                                <span className="renter--value">Available spots:</span>
                                <span className="renter--icon"><i className="fas fa-car margin-right"></i>{this.state.selectedSpot.availablespots}</span> */}
                                        <hr className="rent-break"></hr>
                                        <span className="renter--value">Distance from stadium</span>
                                        <span className="renter--icon"><i class="fas fa-walking margin-right"></i>{this.state.distance ? this.state.distance : 'N/A'}</span>
                                    </h3>
                                </div>
                            </div>

                        </div>

                        <div className="col-2-of-3">
                            <div className="header-renter__map-box">
                                <div className="header-renter__map">
                                    <GoogleMap markers={[this.state.selectedSpot]} />
                                </div>
                            </div>
                        </div>

                    </div>



                    {/* <div className="row">
                    <div className="col-1-of-1">
                        <h3 className="heading-primary">
                            <span className="heading-primary--page">Location</span>
                        </h3>
                        <GoogleMap markers={[this.state.parkingspots]} />
                    </div>
                </div> */}
                </section>

                <div className="footer-reservation">

                    {/* <div className="footer-reservation__left">
                        <span className="renter--item-address">{this.state.parkingspots.streetaddress}</span>
                    </div> */}

                    <div className="footer-reservation__container">
                        {/* START FOOTER BUTTON */}
                        <div className="footer__button">
                            {this.props.loggedIn ? (
                                <Popup trigger={<span className="btn btn--rent">Rent This Spot</span>} modal>
                                    {close => (
                                        <div className="modal">
                                            <a href="#" className="popup__close" onClick={close}>
                                                &times;
                                            </a>
                                            <RentParkingSpot />
                                            <button
                                                className="button"
                                                onClick={() => {
                                                    console.log('modal closed')
                                                    close()
                                                }}
                                            >
                                            </button>
                                        </div>
                                    )}
                                </Popup>
                            ) : (
                                    <Popup trigger={<span className="btn btn--rent">Log in required</span>} modal>
                                        {close => (
                                            <div className="modal">
                                                <a href="#" className="popup__close" onClick={close}>
                                                    &times;
                                        </a>
                                                <Login updateUser={this.props.updateUser} />
                                                <button
                                                    className="button"
                                                    onClick={() => {
                                                        console.log('modal closed')
                                                        close()
                                                    }}
                                                >
                                                </button>
                                            </div>
                                        )}
                                    </Popup>
                                )}
                        </div>
                        {/* END FOOTER BUTTON ^ */}

                        <div className="footer__price">
                            <p className="renter--footer-price"><i className="fas fa-dollar-sign"></i>{this.state.selectedSpot.price}
                                <span className="renter--footer-price-text">/ per game</span>
                            </p>
                        </div>

                    </div>

                </div>
            </div>


        );
    }
}

export default RentThisSpot;



