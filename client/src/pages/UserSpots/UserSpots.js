import React, { Component } from "react";
import './../../App.css';

class UserSpot extends Component {

    state = {
        postedspots: [],
        rentedspots: []
    };

    componentDidMount() {
        this.loadPostedSpots();
    }

    loadPostedSpots = () => {
        API.getPostedSpots()
            .then(response => this.setState({ 
                parkingspots: response.data
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <section>
               
            </section>
        );
    }
}

export default RentThisSpot;
