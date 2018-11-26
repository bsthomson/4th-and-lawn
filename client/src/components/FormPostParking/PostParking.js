import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"

import ParkingSpotForm from './ParkingSpotForm';

class PostParkingSpot extends Component {
    constructor(props) {
        super(props);

        this.noOldDates = this.noOldDates.bind(this);
    }

    componentDidMount() {
        this.noOldDates();
    }

    noOldDates() {
        let parkingSpotArray = [];
        API.getEvents()
            .then(response => {
                response.data.forEach(parkingSpot => {
                    if (moment(parkingSpot.date) > moment()) {
                        parkingSpotArray.push(parkingSpot)
                    }
                })
            })
            .then(() => this.setState({ events: parkingSpotArray }))
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            let returnThis = this.state.events.length > 1 ? (
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
                    handleSubmit={this.props.createSpot}
                />
            ) : (
                    <div>Events are loading...</div>
                )

            return returnThis;
        }
    }
}

export default PostParkingSpot;