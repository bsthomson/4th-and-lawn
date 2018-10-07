import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            availablespots: '',
            destination: '',
            instructions: '',
            date: '',
            time: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // talk to Jolie about this...
    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit");

        axios.post('/parkingspot', {
            address: this.state.address,
            availableSpots: this.state.availablespots,
            destination: this.state.destination,
            instructions: this.state.instructions,
            date: this.state.date,
            time: this.state.time
        })
        .then(response => {
            console.log("parking spot info: ");
            console.log(response);
            if (response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            <div className="postParkingSpotForm">
                <div className="heading-form">
                    <span className="heading-form--title">Want to host your parking spots on gameday?</span>
                </div>

                <form>
                    <div class="form__group">
                        <input className="form__input"
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input"
                            type="number"
                            id="availableSpots"
                            name="availableSpots"
                            placeholder="Number of avaliable spots"
                            value={this.state.availableSpots}
                            onChange={this.handleChange}
                         />
                    </div>
                    <div className="form__group">
                            <input className="form__input"
                                type="text"
                                id="destination"
                                name="destination"
                                placeholder="Destination"
                                value={this.state.destination}
                                onChange={this.handleChange}
                             />
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="instructions">Parking Instructions</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="text"
                                id="instructions"
                                name="instructions"
                                placeholder="Parking Insturctions"
                                value={this.state.instructions}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="date">Date Parking Spot is Available</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="date"
                                id="date"
                                name="date"
                                placeholder="MM/DD/YYYY"
                                value={this.state.value}
                                onChange={this.handleChange}
                             />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="time">Time Parking Spot is Available</label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                type="time"
                                id="time"
                                name="time"
                                placeholder="HH:MM"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-7"></div>
                            <button className="btn btn-primary col-1 col-mr-auto"
                                onClick={this.handleSubmit}
                                type="submit">
                                Submit
                            </button>
                    </div>

                    <hr className="form-break" />

					<div className="heading-form">
						<span className="heading-form--text">Already have an account? Login</span>
                    </div>
                        
                </form>
            </div>
        }
    }
}

export default PostParkingSpot;