import React, { Component } from 'react'
import API from "./../../utils/API";
import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMap/GoogleMap";
import Geocode from "react-geocode";


    // getting longitudes and latitudes from addresses
    // set Google Maps Geocoding API for purposes of quota management.
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

    // Get latitudes and Longitudes from addresses
    // Geocode.fromAddress("Lawrence, Ks").then(
    //     response => {
    //         const { lat, lng } = response.results[0].geometry.location;
    //         return {lat: lat, lng:lng};
    //     },
    //     error => console.error
    // );

function getGeocode(address){
    console.log(address);
    return Geocode.fromAddress(address).then(
        response => {
            console.log(response)
            // TODO
            // IF !partialMatch take the first one
            // If partialMacth
            // loop through results
            // check address components for city and state
            // if both match, return result[idx]
            const { lat, lng } = response.results[0].geometry.location;
            return {lat: lat, lng:lng};
        },
        error => console.error
    );
}

class CardParkingSpot extends Component {

	state = {
        parkingspots: [],
    };


	componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
        .then(response =>{
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
                    parkingspots: spots
                });
            })

            
        })
        .catch(err => console.log(err));
    };


render() {
	return (
		<div>
		    {this.state.parkingspots.length ? (
                <div className="parking-container">
                    {this.state.parkingspots.map(parkingspot => (
                       
                            <div className="col-1-of-3">
                                <div className="parking-card" key={parkingspot._id}>
                                    <div className="parking-card__side parking-card__side--front">

                                        <div className="parking-card__picture">
                                            <div className="parking-card__picture--1">&nbsp;</div>
                                        </div>

                                        <div className="parking-card__game-details">
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">{parkingspot.address}</span>
                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">Available spots: {parkingspot.availablespots}</span>                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub"></span>                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link to={"/rentthisspot/" + parkingspot._id}>
                                    <input
                                        className="btn btn--form"
                                        type="submit"
                                        value="Reserve"
                                        onClick={this.handleSubmit}
                                    />
                                </Link>
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
