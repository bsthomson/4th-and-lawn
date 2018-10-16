import React, { Component } from "react";
import axios from "axios";

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            availablespots: '',
            instructions: '',
            game: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/parkingspots', {
            address: this.state.address,
            availablespots: this.state.availablespots,
            instructions: this.state.instructions,
            game: this.state.game
        })
        .then(response => {
            console.log("parking spot info: ");
            console.log(response.data);
            if (response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/parking-spots"
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

                    <h1 className="heading-primary">
                        <span className="heading-primary--form left">List your parking spots before game day.</span>
                    </h1>

                        <div className="form__group">
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
                                id="availablespots"
                                name="availablespots"
                                placeholder="Parking spots available"
                                value={this.state.availablespots}
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
                                className="btn btn--form"
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