import React, { Component } from 'react'
import '../../App.css';
import '../../img/parking-garage.jpg'
import PostParkingSpot from './../form-post-parking/post-parking'

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        return (
            
            <section className="section-home">
                <PostParkingSpot/>
                <div className="header__text-box--left">
                         
                </div>
            </section>
        )

    }
}

export default Home
