import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            streetaddress: '',
            city: '',
            state: '',
            zipcode: '',
            availablespots: '',
            instructions: '',
            event: '',
            events: [],
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.noOldDates();
    }

    noOldDates = () => {
        let parkingSpotArray = [];
        API.getEvents()
            .then(response => {
                response.data.forEach(parkingSpot => {
                        if (moment(parkingSpot.date) > moment()) {
                            parkingSpotArray.push(parkingSpot)
                        }
                })
            })
            .then( () => {
                this.setState(
                    { events: parkingSpotArray }
                )
            })
            .catch( err => {
                console.log(err)
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state)

        axios.post('/api/parkingspots', {
            streetaddress: this.state.streetaddress,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            availablespots: this.state.availablespots,
            price: this.state.price,
            instructions: this.state.instructions,
            event: this.state.event
        })
        .then(response => {
            console.log("parking spot info: ");
            console.log(response.data);
            if (response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/posted-spots"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to ={{ pathname: this.state.redirectTo }} />
        } else {
            return (
            <div className="PostParkingSpotForm">

                <form>
                    <div id="parkingspotform">

                    <h1 className="heading-primary">
                        <span className="heading-primary--form center">Create a parking spot.</span>
                    </h1>

                    <div className="form__group">
                        <input className="form__input"
                            type="text"
                            id="streetaddress"
                            name="streetaddress"
                            placeholder="Address"
                            value={this.state.streetaddress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input-xs"
                            type="city"
                            id="city"
                            name="city"
                            placeholder="Lawrence"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                        <input className="form__input-xs"
                            type="text"
                            id="state"
                            name="state"
                            placeholder="KS"
                            value={this.state.state}
                            onChange={this.handleChange}
                        />
                        <input className="form__input-xs"
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            placeholder="66044"
                            value={this.state.zipcode}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input-sm"
                            type="number"
                            id="availablespots"
                            name="availablespots"
                            placeholder="Number of spots"
                            value={this.state.availablespots}
                            onChange={this.handleChange}
                        />
                        <input className="form__input-sm"
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                    </div>
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
                    {this.state.events.length ? (
                        <div className="form__group">
                            <select name="event" className="form__input" value={this.state.event} onChange={this.handleChange}>
                                <option>
                                    Select an Event
                                </option>
                                {this.state.events.map(event => (
                                    <option
                                        key={event._id}
                                        id="event"
                                        name="event"
                                        placeholder="Event"
                                        value={event._id}>
                                        {moment(event.date).format("MM-DD-YYYY")} {event.shortName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="form__group">
                            <select name="event" className="form__input">                                
                                <option>
                                    No Events Available
                                </option>                            
                             </select>
                        </div>
                    )}
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
}

export default PostParkingSpot;