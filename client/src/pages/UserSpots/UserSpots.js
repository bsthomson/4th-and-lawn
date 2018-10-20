import React, { Component } from "react";
import './../../App.css';
import axios from 'axios';

class UserSpot extends Component {

    state = {
        postedspots: [],
        rentedspots: []
    };

    componentDidMount() {
        this.loadPostedSpots();
    }

    loadPostedSpots = () => {
        axios.get("/api/postedspots")
            .then(response => this.setState({             
                postedspots: response.data[0].parkingspots
            }))
            .catch(err => console.log(err));
    };

    deletePostedSpot = id => {
        axios.delete("/api/postedspots/" + id)
        .then(response => this.loadPostedSpots())
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="section-dashboard">
                <div className="dashboard__sidebar">

                </div>
                <div className="dashboard__main">
                    <div className="row">
                        <div className="col-1-of-2">
                            {/* START */}
                            {this.state.postedspots.length ? (
                <div className="parking-container">
                    {this.state.postedspots.map(postedspot => (
                            <div className="col-1-of-2" key={postedspot._id}>
                                <div className="parking-card">
                                    <div className="parking-card__side parking-card__side--front">

                                        <div className="parking-card__picture">
                                            <div className="parking-card__picture--1">&nbsp;</div>
                                        </div>

                                        <div className="parking-card__details">
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">{postedspot.streetaddress}</span>
                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">Available spots: {postedspot.availablespots}</span>                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">
                                                    <input
                                                        className="btn btn--form"
                                                        type="button"
                                                        value="Remove"
                                                        onClick={() => this.deletePostedSpot(postedspot._id)}
                                                    />
                                                </span>                             
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
                            {/* END */}
                        </div>
                        <div className="col-1-of-2">Test</div>
                    </div>
                </div>
        </div>
        );
    }
}

export default UserSpot;
