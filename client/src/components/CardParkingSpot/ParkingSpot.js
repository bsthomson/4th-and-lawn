import React, { Component } from 'react';
import API from "../../utils/API";
import { Link } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';

class CardParkingSpot extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parkingspots: [],
            gameday: []
        };
    }

	componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
        .then(response => this.setState({ 
            parkingspots: response.data,
        }))
        .catch(err => console.log(err));
    };

render() {
	return (
        
		<div>
		    {this.state.parkingspots.length ? (
                <div className="parking-container">
                    {this.state.parkingspots.map(parkingspot => (
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
                                                            <span className="spot--test">$20</span>
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
                                                                <i class="fas fa-home spot--value"></i>
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
         
		</div>
        
	)
    }
}

export default CardParkingSpot;
