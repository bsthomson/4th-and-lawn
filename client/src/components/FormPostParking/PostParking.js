import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"

import ParkingSpotForm from './ParkingSpotForm';

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
                <ParkingSpotForm
                    formTitle={"Parking Spot Details"}
                    streetaddress={this.state.streetaddress}
                    city={this.state.city}
                    state={this.state.state}
                    zipcode={this.state.zipcode}
                    availableSpots={this.state.availablespots}
                    price={this.state.price}
                    instructions={this.state.instructions}
                    events={this.state.events}

                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    />
            )
        }
    }
}

export default PostParkingSpot;