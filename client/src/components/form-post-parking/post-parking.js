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
            return (
            <div className="PostParkingSpotForm">

                <form>
                    <div className="form__container">

                    <h1 class="heading-primary">
                        <span class="heading-primary--form left">Game day parking made easy. For everyone.</span>
                    </h1>

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
                                placeholder="Parking spots available"
                                value={this.state.availableSpots}
                                onChange={this.handleChange}
                            />
                        </div>
                        {/* <div className="form__group">
                                <input className="form__input"
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    placeholder="Destination"
                                    value={this.state.destination}
                                    onChange={this.handleChange}
                                />
                        </div>*/}
                        <div className="form__group">
                                <input className="form__input"
                                    type="text"
                                    id="instructions"
                                    name="instructions"
                                    placeholder="Parking instructions"
                                    value={this.state.instructions}
                                    onChange={this.handleChange}
                                />
                        </div>
                        <div className="form__group">
                        <select name="game" className="form__input">
                            <option 
                                id="game"
                                name="game"
                                value={this.state.value}
                                onChange={this.handleChange}>
                                    Fri, Oct 26 vs TCU (TBA)
                            </option>
                            <option 
                                id="game"
                                name="game"
                                value={this.state.value}
                                onChange={this.handleChange}>
                                    Fri, Nov 2 vs Iowa State (TBA)
                            </option>
                            <option 
                                id="game"
                                name="game"
                                value={this.state.value}
                                onChange={this.handleChange}>
                                    Fri, Nov 23 vs Texas (11:00 AM)
                            </option>
                        </select>
                        </div>
                        {/*<div className="form__group">
                                <input className="form__input"
                                    type="date"
                                    id="date"
                                    name="date"
                                    placeholder="MM/DD/YYYY"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                        </div>
                        <div className="form__group">
                                <input className="form__input"
                                    type="time"
                                    id="time"
                                    name="time"
                                    placeholder="HH:MM"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                    </div>*/}
                        <div className="form__group">
                            <input
                                class="btn btn--form"
                                type="submit"
                                value="Submit"
                                onClick={this.handleSubmit}
                            />
                        </div>
                    </div>   
                </form>
            </div>
            )
        }
}

export default PostParkingSpot;