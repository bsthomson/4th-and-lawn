import React, { Component } from "react";
import API from "../../../utils/API";
import Wrapper from "../../components4APS/Wrapper";
import ParkingCard from "../../components4APS/ParkingCard";

class AvaParkingSpots extends Component {
    state = {
        parkingSpots: []
    };

    componenetDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(res => this.setState({ parkingSpots: res.data}))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Wrapper>
                {this.state.parkingSpots.map(parkingSpot => (
                    <ParkingCard
                    // HELP?
                        id={parkingSpot.user}
                        key={parkingSpot.user}
                        name={parkingSpot.user}
                    />
                ))}
            </Wrapper>
        );
    }
}


export default AvaParkingSpots;
