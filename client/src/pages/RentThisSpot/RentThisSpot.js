import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form"

class RentThisSpot extends Component {
    state = {
        parkingspot: [],
    };

    render() {
        return (
            <section>
                <RentParkingSpot />
            </section>
        );
    }
}


export default RentThisSpot;
