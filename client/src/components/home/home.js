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
            
                <div class="header__text-box--left">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main left">Game day parking</span>
                        <span class="heading-primary--main left">made easy.</span>
                    </h1>     
                </div>
            </section>
        )

    }
}

export default Home
