import React, { Component } from "react";
import './../../App.css';
import axios from 'axios';
import { Link } from "react-router-dom";


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
             
                postedspots: response.data
            }), console.log(this.response))
 
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
		    {this.state.postedspots.length ? (
                <div className="parking-container">
                    {this.state.postedspots.map(postedspot => (
                        <li key={postedspot._id}>
                            <div className="col-1-of-3">
                                <div className="parking-card">
                                    <div className="parking-card__side parking-card__side--front">

                                        <div className="parking-card__picture">
                                            <div className="parking-card__picture--1">&nbsp;</div>
                                        </div>

                                        <div className="parking-card__game-details">
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">{postedspot.address}</span>
                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub">Available spots: {postedspot.availablespots}</span>                                            </div>
                                            <div className="col-1-of-1">
                                                <span className="parking-details parking-details--sub"></span>                             
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link to={"/rentthisspot/" + postedspot._id}>
                                    <input
                                        className="btn btn--form"
                                        type="submit"
                                        value="Reserve"
                                        onClick={this.handleSubmit}
                                    />
                                </Link>
                            </div>
                        </li>
                    ))}
                </div>
            ) : (
            <h3>No Results to Display</h3>
            )}
		</div>

        );
    }
}

export default UserSpot;
