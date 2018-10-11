import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import { List, ListItem } from "./../../components/List";
import { Link } from "react-router-dom";

class ParkingSpots extends Component {
    state = {
        parkingspots: [],
    };

    componentDidMount() {
        this.loadParkingSpots();
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(response => this.setState({ 
                parkingspots: response.data
            }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <section>
            {this.state.parkingspots.length ? (
                <ul>
                  {this.state.parkingspots.map(parkingspot => (
                    <ListItem key={parkingspot._id}>
                      <Link to={"/rentthisspot/" + parkingspot._id}>
                        <strong>
                          {parkingspot.address} by {parkingspot.availablespots}
                        </strong>
                      </Link>
                    </ListItem>
                  ))}
                </ul>
              ) : (
                <h3>No Results to Display</h3>
              )}
              </section>
        );
    }
}


export default ParkingSpots;
