import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function getGeocode(address){
    console.log(address);
    return Geocode.fromAddress(address).then(
        response => {
            console.log(response)
            const { lat, lng } = response.results[0].geometry.location;
            return {lat: lat, lng:lng};
        },
        error => console.error
    );
}

class CardParkingSpot extends Component {

    state = {
            parkingspots: [],
            gameday: [],
            game: ''
        };
    

    componentDidMount() {
        this.loadParkingSpots();
    }

    componentDidUpdate() {
        console.log(this.props.game)
        if (this.props.game !== this.state.game) {
        this.selectDates();
        }
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
        .then(response =>{
            console.log(response);
            const spots = response.data;
            const geocodes = [];
            spots.forEach(spot=>{
                spot.address = `${spot.streetaddress}, ${spot.city}, ${spot.state} ${spot.zipcode}`;
                geocodes.push(getGeocode(spot.address));
            })

            Promise.all(geocodes)
            .then(geoCodeResults =>{
                // TODO: set geoCode data on spot
                geoCodeResults.forEach((res, idx)=>{
                    const spot = spots[idx];
                    const {lat, lng} = res;
                    spot.lat = lat;
                    spot.lng = lng;
                })
            }).then(()=>{
                this.setState({ 
                    parkingspots: spots,
                    gameday: response.data
                });
            })

            
        })
        .catch(err => console.log(err));
    };

    selectDates() {
        let parkingSpotsArray = [];
        this.state.parkingspots.forEach(parkingspot => {
            console.log(this.state.parkingspots)
            if (parkingspot.event[0]._id === this.props.game) {
                parkingSpotsArray.push(parkingspot)
            }
        })
        this.setState({
            gameday: parkingSpotsArray,
            game: this.props.game
        })
    };

    
    render() {
            return (
                
                <div>
                    {this.state.gameday.length ? (
                        <div className="parking-container">
                            {this.state.gameday.map(parkingspot => (
                                    <div className="col-1-of-3" key={parkingspot._id}>
                                        <div className="parking-card">
                                            <div className="parking-card__side parking-card__side--front">
        
                                                <div className="parking-card__banner">
                                                    <p className="spot--banner">{parkingspot.streetaddress}</p>
                                                </div>
        
                                                <div className="parking-card__picture">
                                                    <div className="parking-card__picture--1">&nbsp;</div>
                                                </div>

                                                {/* <div className="parking-card__address">
                                                    <div className="row-container">
                                                        <div className="col-1-of-1">
                                                            <p className="card-heading--address">{parkingspot.streetaddress}</p>
                                                            <p className="card-heading--detail-title">Lawrence, KS</p>
                                                        </div>
                                                    </div>
                                                </div> */}
        
                                                <section className="parking-card__details">
                                                    {/* <div className="parking-card__user-row">
                                                        <div className="parking-card__user-col--icon-l">
                                                            <span className="parking-card--icon-white">
                                                                <i className="fas fa-dollar-sign parking-card--icon-padding"></i>
                                                                {parkingspot.price}
                                                            </span>
                                                        </div>

                                                        <div className="parking-card__user-col--icon-m">
                                                            <span className="parking-card--icon-white">
                                                                <i className="fas fa-car parking-card--icon-padding"></i>
                                                                {parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "Sold"}
                                                            Full
                                                            </span>
                                                        </div>

                                                        <div className="parking-card__user-col--icon-r">
                                                            <span className="parking-card--icon-white">
                                                                <i className="fas fa-map-marker-alt parking-card--icon-padding"></i>
                                                                TBA
                                                            </span>
                                                        </div>

                                                    </div> */}

                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                
                                                                <div className="parking-card__button">
                                                                    <span className="spot--test"><i className="fas fa-money-bill-alt spot--icon"></i></span>
                                                                </div>
                                                                <p className="card-heading--detail-title">Price</p>
                                                                <p className="card-heading--detail-value">${parkingspot.price}</p>
                                                            </div>         
                                                        </div>

                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                
                                                                <div className="parking-card__button">
                                                                <span className="spot--test"><i className="fas fa-map-marker-alt spot--icon"></i></span>
                                                                </div>
                                                                <p className="card-heading--detail-title">Distance</p>
                                                                <p className="card-heading--detail-value">N/A</p>
                                                            </div>
                                                        </div>

                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                
                                                                <div className="parking-card__button">
                                                                    <span className="spot--test"><i className="fas fa-car spot--icon"></i></span>
                                                                </div>
                                                                <p className="card-heading--detail-title">Spots</p>
                                                                <p className="card-heading--detail-value">{parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "FULL"}</p>
                                                            </div>         
                                                        </div>
                                                   


                                                </section>

                                                {/* <div className="parking-card__game">
                                                    <p className="card-heading--detail-title">{parkingspot.event[0].event}</p>
                                                </div> */}

                                            </div>
                                            {/* ^ END OF FRONT ^ */}

                                            <div className="parking-card__side parking-card__side--back parking-card__side--back-1">
                                                <div className="parking-card__cta">
                                                <Link to={"/rentthisspot/" + parkingspot._id}>
                                                                        {parkingspot.availablespots - parkingspot.renter.length > 0 ? (
                                                                            <input
                                                                                className="btn btn--card"
                                                                                type="submit"
                                                                                value="View"
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
                                                                        )
                                                                        }
                                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ^ END OF CARD ^ */}
                                    </div>
                            ))}
                        </div>
                ) : (
                <h3>No Parking Spots Available</h3>
                )}
                {/* <div><GoogleMap markers={this.state.parkingspots}/></div> */}
            </div>
    
        )
    }
    }
    
export default CardParkingSpot;
    

