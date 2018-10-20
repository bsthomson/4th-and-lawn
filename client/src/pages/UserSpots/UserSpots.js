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

                        <h1 className="heading-primary">
                            <span className="heading-primary--form">Dashboard</span>
                        </h1>

                        <div className="col-1-of-1">
                            {/* START */}
                            {this.state.postedspots.length ? (
                                <div className="row">
                                    {this.state.postedspots.map(postedspot => (
                                            <div className="col-1-of-1" key={postedspot._id}>
                                                <div className="dashboard-card">
                                                    <div className="dashboard-card__side">

                                                        <div className="dashboard-card__details">
                                                            <div className="col-1-of-3">
                                                                <span className="dashboard-details dashboard-details--sub">{postedspot.streetaddress}</span>
                                                            </div>
                                                            <div className="col-1-of-3">
                                                                <span className="dashboard-details dashboard-details--sub">Available spots: {postedspot.availablespots}</span>                                            </div>
                                                            <div className="col-1-of-3">
                                                                <span className="dashboard-details dashboard-details--sub">
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
                        <div className="col-1-of-1">Test</div>
                    </div>
                </div>
        </div>
        );
    }
}

export default UserSpot;
