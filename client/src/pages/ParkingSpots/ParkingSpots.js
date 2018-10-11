import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import { List, ListItem } from "./../../components/List";
import { Link } from "react-router-dom";

class ParkingSpots extends Component {
    state = {
        parkingspots: [],
    };

    componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(response => this.setState({ 
                parkingspots: response.data
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <section className="section-parking">

            <h1 className="heading-page">
                <span className="heading-page--title">Available spots near Memorial Stadium</span>
            </h1>

              {this.state.parkingspots.length ? (

                <div className="parking-container">

                    {this.state.parkingspots.map(parkingspot => (
                        <div className="col-1-of-3">
                            <div className="parking-card">
                                <div className="parking-card__side parking-card__side--front">

                                    <div className="parking-card__picture">
                                        <div className="parking-card__picture--1">&nbsp;</div>
                                    </div>

                                    <div className="parking-card__game-details">
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub" key={parkingspot._id}>{parkingspot.address}</span>
                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">Available spots: {parkingspot.availablespots}</span>                                            </div>
                                            <div className="col-1-of-1">
                                                <span clasNames="parking-details parking-details--sub"></span>                                            </div>
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
            </section>
        );
    }
}


export default ParkingSpots;
