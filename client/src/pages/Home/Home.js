import React, { Component } from 'react'
import './../../App.css';
import '../../img/parking-garage.jpg'
import PostParkingSpot from './../../components/form-post-parking/post-parking'

class Home extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <section className="section-home">
                <PostParkingSpot/>
            </section>
        )
    }
}

export default Home
