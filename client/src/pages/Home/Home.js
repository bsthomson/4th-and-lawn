import React, { Component } from 'react';
import './../../App.css';
import '../../img/parking-garage.jpg';
import PostParkingSpot from '../../components/FormPostParking/PostParking';
import axios from 'axios';

class Home extends Component {

    loadParkingSpots = () => {
        axios.get('')
        .then(response => this.setState({ 
            parkingspots: response.data,
        }))
        .catch(err => console.log(err));
    };

    render() {
        return (
            <section className="section-home">
                <PostParkingSpot/>
            </section>
        )
    }
}

export default Home
