import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import Geocode from "react-geocode";

import { getGeocode, getWalkingDistance } from '../../utils/Helpers';

class CardParkingSpot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableSpots: [],
            distanceTimes: {},
            gameday: [],
            selectedEvent: this.props.event
        };

        this.loadParkingSpots = this.loadParkingSpots.bind(this);
    }

    componentWillReceiveProps(props) {
        const id = this.props.event._id;
        if (props.event.id !== id)
            this.loadParkingSpots();
    }

    // Still refreshes data 1 selection behind the current selection
    componentDidMount() {
        console.log({
            props: this.props
        })

        this.loadParkingSpots();
    }

    loadParkingSpots() {
        API.getParkingSpotsByEvent(this.props.event._id)
            .then(response => {
                const returnedSpots = response.data;
                const geocodes = [];

                returnedSpots.forEach(spot => {
                    spot.address = `${spot.streetaddress}, ${spot.city}, ${spot.state} ${spot.zipcode}`;
                    geocodes.push(getGeocode(spot.address));

                    getWalkingDistance(spot.address, this.state.selectedEvent.location)
                        .then(walkingDistance => {
                            // TODO :: Update this to include smarter logic for handling data aggregation
                            let tempDistances = this.state.distanceTimes;
                            tempDistances[spot._id] = walkingDistance;

                            this.setState({ distanceTimes: tempDistances });
                        })
                })

                Promise.all(geocodes)
                    .then(geoCodeResults => {
                        console.log({ geoCodeResults });

                        // TODO: set geoCode data on spot
                        geoCodeResults.forEach((res, idx) => {
                            const spot = returnedSpots[idx];
                            const { lat, lng } = res;
                            spot.lat = lat;
                            spot.lng = lng;
                        })
                    })
                    .then(() => {
                        this.setState({
                            availableSpots: returnedSpots,
                        });
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    };

    // selectDates() {
    //     let parkingSpotsArray = [];
    //     this.state.parkingspots.forEach(parkingspot => {
    //         console.log(this.state.parkingspots)
    //         if (parkingspot.event[0]._id === this.props.event) {
    //             parkingSpotsArray.push(parkingspot)
    //         }
    //     })
    //     this.setState({
    //         gameday: parkingSpotsArray,
    //         selectedEvent: this.props.event
    //     })
    // };

    render() {
        console.log({
            state: this.state
        })

        return (

            <section>
                {
                    <div className="parking-container">
                        {this.state.availableSpots.length > 0 ? (
                            this.state.availableSpots.map((parkingspot, idx) => (
                                <div className="col-1-of-3" key={parkingspot._id}>

                                    {parkingspot.availablespots - parkingspot.renter.length > 0 ? (
                                        <Link to={"/rentthisspot/" + parkingspot._id}>
                                            {/* CARD START -> */}
                                            <section className="parking-card">
                                                <div className="parking-card__side parking-card__side--front">

                                                    <section className="parking-card__details">
                                                        <h3 className="parking-card__title">
                                                            <span className="parking-card__title--address">{parkingspot.streetaddress}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">{this.state.selectedEvent.shortName ? this.state.selectedEvent.shortName : 'No Event Name Set'}</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-football-ball"></i></span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Price per game:</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-dollar-sign margin-right"></i>{parkingspot.price ? parkingspot.price : 'N/A'}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Available spots:</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-car margin-right"></i>{parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "Sold out"}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Distance from stadium:</span>
                                                            <span className="parking-card__title--icon"><i class="fas fa-walking margin-right"></i>{this.state.distanceTimes[parkingspot._id] ? this.state.distanceTimes[parkingspot._id] : 'N/A'}</span>
                                                        </h3>
                                                    </section>

                                                </div>
                                                {/* ^ END OF FRONT ^ */}

                                                <div className="parking-card__side parking-card__side--back parking-card__side--back-1">
                                                    <div className="parking-card__cta">
                                                        <Link to={"/rentthisspot/" + parkingspot._id}>
                                                            {parkingspot.availablespots - parkingspot.renter.length > 0 ? (
                                                                <button
                                                                    className="btn btn--card"
                                                                    type="submit"
                                                                    defaultValue="Parking Details"
                                                                    onClick={this.handleSubmit}
                                                                >Parking Details</button>
                                                            ) : (
                                                                    <button
                                                                        className="btn btn--card"
                                                                        type="submit"
                                                                        defaultValue="Sold Out"
                                                                        onClick={this.handleSubmit}
                                                                        disabled
                                                                    >Sold Out</button>
                                                                )}
                                                        </Link>
                                                        <button
                                                            className="btn btn--card"
                                                            defaultValue="Add to Favorites"
                                                        >Add to Favorites</button>
                                                    </div>
                                                </div>
                                            </section>
                                            {/* ^ END OF CARD ^ */}
                                        </Link>
                                    ) : (
                                            <section className="parking-card">
                                                <div className="parking-card__side parking-card__side--front">

                                                    <section className="parking-card__details">
                                                        <h3 className="parking-card__title">
                                                            <span className="parking-card__title--address">{parkingspot.streetaddress}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">{parkingspot.event[0].event}</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-football-ball"></i></span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Price per game:</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-dollar-sign margin-right"></i>{parkingspot.price}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Available spots:</span>
                                                            <span className="parking-card__title--icon"><i className="fas fa-car margin-right"></i>{parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "Sold"}</span>
                                                            <hr className="card-break"></hr>
                                                            <span className="parking-card__title--value">Distance from stadium:</span>
                                                            <span className="parking-card__title--icon"><i class="fas fa-walking margin-right"></i>{this.state.distance}</span>
                                                        </h3>
                                                    </section>

                                                </div>
                                                {/* ^ END OF FRONT ^ */}

                                                <div className="parking-card__side parking-card__side--back parking-card__side--back-1">
                                                    <div className="parking-card__cta">
                                                        <Link to={"/rentthisspot/" + parkingspot._id}>
                                                            {parkingspot.availablespots - parkingspot.renter.length > 0 ? (
                                                                <input
                                                                    className="btn btn--card"
                                                                    type="submit"
                                                                    // value="Parking details"
                                                                    onClick={this.handleSubmit}
                                                                />
                                                            ) : (
                                                                    <input
                                                                        className="btn btn--card"
                                                                        type="submit"
                                                                        // value="Sold out"
                                                                        onClick={this.handleSubmit}
                                                                        disabled
                                                                    />
                                                                )}
                                                        </Link>
                                                        <input
                                                            className="btn btn--card"
                                                        // value="Add to favorites"
                                                        />
                                                    </div>
                                                </div>
                                            </section>
                                        )}

                                </div>
                            ))
                        ) : (
                                <div style={{ color: "red", textAlign: "center" }} className="container-fluid">
                                    <h3>No spots available at this time</h3>
                                </div>
                            )
                        }
                    </div>

                }
                {
                    // <div>
                    //     <GoogleMap markers={this.state.availableSpots} />
                    // </div>
                }
            </section>

        )
    }
}

export default CardParkingSpot;


