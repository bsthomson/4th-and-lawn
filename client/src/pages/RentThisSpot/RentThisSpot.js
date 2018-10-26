import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';
import Login  from './../../components/FormLogin/Login';
import GoogleMap from './../../components/GoogleMap/GoogleMap';
import axios from 'axios';
import Geocode from "react-geocode";
import API from "../../utils/API.js"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

function getGeocode(address){
    console.log(address);
    return Geocode.fromAddress(address)
        .then( response => {
            const { lat, lng } = response.results[0].geometry.location;
            return {lat: lat, lng: lng};
        })
        .catch(error => console.log(error))
}

class RentThisSpot extends Component {
    // state = {
    //     parkingspots: []
    // };
    constructor(props) {
        super(props);

        this.state = {
            parkingspots: [],
            loggedIn: false,
            distance: []
        };
    }

    componentDidMount() {
        this.getParkingSpot();
    }

    getParkingSpot = () => {
        axios.get("/api/" + window.location.pathname)
        .then(response => {
            this.setState({ 
                parkingspots: response.data
            });
            console.log(response.data)
            const spots = [];
            spots.push(response.data)
            const geocodes = [];
            spots.forEach(spot => {
                spot.address = `${spot.streetaddress}, ${spot.city}, ${spot.state} ${spot.zipcode}`;
                geocodes.push(getGeocode(spot.address))
            })
            console.log(geocodes)            

            Promise.all(geocodes)
            .then(geoCodeResults =>{
                geoCodeResults.forEach( (res, idx) => {
                    const spot = spots[idx];
                    const {lat, lng} = res
                    spot.lat = lat;
                    spot.lng = lng;
                })
            })
            .then(this.getWalkingDistance())
            .catch( err => console.log(err))
            // this.getWalkingDistance();
        })
        .catch(err => console.log(err));
   
    };

    getWalkingDistance = () => {
        console.log(this.state);
        var origin = this.state.parkingspots.streetaddress + " " + this.state.parkingspots.city + ", " + this.state.parkingspots.state;
        var destination = "1101 Mississippi St Lawrence, KS";
        // const setState = this.setState;
        
        
        API.getDistance(origin, destination) 
        .then((response) => {
            // console.log(response.data)
            // console.log(this);
            this.setState({
                distance: response.data
            })
            
        })

    }

    render() {
        return (
            <div>
            <section className="section-renter">

                <div className="row">
                    <div className="col-1-of-3">

                        <div className="header-renter__title">
                            <div className="header-renter__background">
                                <h3 className="parking-card__title">
                                    <span className="parking-card__title--address">{this.state.parkingspots.streetaddress}</span>
                                    <hr className="card-break"></hr>
                                    {/* <span className="parking-card__title--value">Price per vehicle: ${this.state.parkingspots.price}</span>
                                    <span className="parking-card__title--icon"><i className="fas fa-dollar-sign"></i></span> */}
                                </h3>
                            </div>
                        </div>

                    </div>

                    <div className="col-2-of-3">
                        <div className="header-renter__map-box">
                            <div className="header-renter__map">
                                <GoogleMap markers={[this.state.parkingspots]} />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-1-of-3">
                        <div className="data-renter">
                            <div className="data-renter__background">
                                <div className="data-renter__cta">
                                    <span className="renter--title center">Price</span>
                                    <span className="renter--value-xl center">${this.state.parkingspots.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1-of-3">
                    <div className="data-renter">
                        <div className="data-renter__background">
                            <div className="data-renter__cta">
                                <span className="renter--title center">Spots</span>
                                <span className="renter--value-xl center">{this.state.parkingspots.availablespots}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-1-of-3">
                        <div className="data-renter">
                            <div className="data-renter__background">
                                <div className="data-renter__cta">
                                    <span className="renter--title center">Distance</span>
                                    <span className="renter--value-xl center">{this.state.distance}</span>
                                </div>
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

                    <div className="footer-reservation__left">
                        <span className="renter--item-address">{this.state.parkingspots.streetaddress}</span>
                        <span className="renter--item-price">${this.state.parkingspots.price}</span>
                    </div>

                    <div className="footer-reservation__right">
                    <p className="renter--item-price">${this.state.parkingspots.price}</p>
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
                        <Popup trigger={<span className="btn btn--rent">Log in</span>} modal>
                            {close => (
                            <div className="modal">
                                <a href="#" className="popup__close" onClick={close}>
                                &times;
                                </a>
                                <Login updateUser={this.props.updateUser}/>
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
                
            </div>
        </div>
               
            
        );
    }
}

export default RentThisSpot;


    
