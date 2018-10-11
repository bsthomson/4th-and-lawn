import React, { Component } from "react";
import './../../App.css';
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { Link } from "react-router-dom";
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
