import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function getGeocode(address) {
    console.log(address);
    return Geocode.fromAddress(address)
        .then(response => {
            console.log({
                geocodeResponse: response
            })

            const { lat, lng } = response.results[0].geometry.location;
            return { lat: lat, lng: lng };
        })
        .catch(error => console.log(error))
}

function getWalkingDistance(origin, destination) {
    console.log({
        origin,
        destination
    });

    return API.getDistance(origin, destination)
        .then((response) => {
            console.log({
                walkingDistance: response.data
            });

            return response.data;
        })
}

class CardParkingSpot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableSpots: [],
            gameday: [],
            selectedEvent: this.props.event
        };

        console.log({
            selectedEvent: this.state.selectedEvent
        });

        this.loadParkingSpots = this.loadParkingSpots.bind(this);
    }



    // Probably remove this in favor of loading data conditionally
    //  based on the selected event, otherwise, display a message
    //  for the user to selecta game/event/date
    componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots() {
        API.getParkingSpots()
            .then(response => {
                const returnedSpots = response.data;
                const geocodes = [];

                returnedSpots.forEach(spot => {
                    spot.address = `${spot.streetaddress}, ${spot.city}, ${spot.state} ${spot.zipcode}`;
                    geocodes.push(getGeocode(spot.address));

                    getWalkingDistance(spot.address, this.state.selectedEvent)
                        .then(walkingDistance => {
                            spot.distance = walkingDistance;
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
                        console.log({ returnedSpots })
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
        return (

            <section>
                {this.state.availableSpots.length ? (
                    <div className="parking-container">
                        {this.state.availableSpots.map(parkingspot => (
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
                                                        <span className="parking-card__title--value">{parkingspot.event[0].event}</span>
                                                        <span className="parking-card__title--icon"><i className="fas fa-football-ball"></i></span>
                                                        <hr className="card-break"></hr>
                                                        <span className="parking-card__title--value">Price per game:</span>
                                                        <span className="parking-card__title--icon"><i className="fas fa-dollar-sign margin-right"></i>{parkingspot.price}</span>
                                                        <hr className="card-break"></hr>
                                                        <span className="parking-card__title--value">Available spots:</span>
                                                        <span className="parking-card__title--icon"><i className="fas fa-car margin-right"></i>{parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "Sold out"}</span>
                                                        <hr className="card-break"></hr>
                                                        <span className="parking-card__title--value">Distance from stadium:</span>
                                                        <span className="parking-card__title--icon"><i class="fas fa-walking margin-right"></i>{parkingspot.distance}</span>
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
                                                                value="Parking details"
                                                                onClick={this.handleSubmit}
                                                            />
                                                        ) : (
                                                                <input
                                                                    className="btn btn--card"
                                                                    type="submit"
                                                                    value="Sold out"
                                                                    onClick={this.handleSubmit}
                                                                    disabled
                                                                />
                                                            )}
                                                    </Link>
                                                    <input
                                                        className="btn btn--card"
                                                        value="Add to favorites"
                                                    />
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
                                                                value="Parking details"
                                                                onClick={this.handleSubmit}
                                                            />
                                                        ) : (
                                                                <input
                                                                    className="btn btn--card"
                                                                    type="submit"
                                                                    value="Sold out"
                                                                    onClick={this.handleSubmit}
                                                                    disabled
                                                                />
                                                            )}
                                                    </Link>
                                                    <input
                                                        className="btn btn--card"
                                                        value="Add to favorites"
                                                    />
                                                </div>
                                            </div>
                                        </section>
                                    )}

                            </div>
                        ))}
                    </div>
                ) : (
                        <h3>No Parking Spots Available</h3>
                    )}
                {/* {<div><GoogleMap markers={this.state.parkingspots}/></div>} */}
            </section>

        )
    }
}

export default CardParkingSpot;


