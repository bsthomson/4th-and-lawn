import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function getGeocode(address){
    console.log(address);
    return Geocode.fromAddress(address)
        .then( response => {
            const { lat, lng } = response.results[0].geometry.location;
            return {lat: lat, lng:lng};
        })
        .catch(error => console.log(error))
}

class CardParkingSpot extends Component {

    state = {
            parkingspots: [],
            gameday: [],
            game: this.props.game
        };
    

	componentDidMount() {
        this.loadParkingSpots();
    }

    componentDidUpdate() {
        console.log(this.state)
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
            })
            .then(()=>{
                this.setState({ 
                    parkingspots: spots,
                    gameday: response.data
                });
            })
            .catch( err => console.log(err))

            
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
                                                    <p className="spot--banner">{parkingspot.event[0].event}</p>
                                                </div>
        
                                                <div className="parking-card__picture">
                                                    <div className="parking-card__picture--1">&nbsp;</div>
                                                </div>
        
                                                <div className="parking-card__details">
                                                    <div className="row-container">
                                                        <div className="col-1-of-1">
                                                            <p className="spot--address">
                                                                {parkingspot.streetaddress}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                <p className="spot--title">Price</p>
                                                                <div className="parking-card__button">
                                                                    <span className="spot--test">${parkingspot.price}</span>
                                                                </div>
                                                            </div>         
                                                        </div>
                                                        <div className="col-1-of-3">
                                                            {/* <p className="spot--address">
                                                                {parkingspot.address}
                                                            </p> */}
                                                            <div className="spot-container">
                                                                <p className="spot--title">Spots</p>
                                                                <div className="parking-card__button">
                                                                    <span className="spot--test">{parkingspot.availablespots - parkingspot.renter.length > 0 ? parkingspot.availablespots - parkingspot.renter.length : "FULL"}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                            <p className="spot--title">Details</p>
                                                                <div className="parking-card__link">
                                                                    <Link to={"/rentthisspot/" + parkingspot._id}>
                                                                        <i className="fas fa-home spot--value"></i>
                                                                        {parkingspot.availablespots - parkingspot.renter.length > 0 ? (
                                                                            <input
                                                                                className="parking-card__button"
                                                                                type="submit"
                                                                                value=""
                                                                                onClick={this.handleSubmit}
                                                                            />
                                                                        ) : (
                                                                            <input
                                                                                className="btn btn--form"
                                                                                type="submit"
                                                                                value=""
                                                                                onClick={this.handleSubmit}
                                                                                disabled
                                                                            />
                                                                        )
                                                                        }
                                                                    </Link>
                                                                </div>
                                                                    
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                            ))}
                        </div>
                ) : (
                <h3>No Results to Display</h3>
                )}
                <div><GoogleMap markers={this.state.parkingspots}/></div>
            </div>
    
        )
    }
    }
    
export default CardParkingSpot;
    
