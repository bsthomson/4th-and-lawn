import React, { Component } from 'react'
import '../../App.css';
import '../../img/parking-garage.jpg';

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        return (
            <section className="section-home">
                <div class="header__text-box--left">
                    <h1 class="heading-primary">
                        <span class="heading-primary--main left">Game Day Parking</span>
                        <span class="heading-primary--main left">Made Easy.</span>
                    </h1>     
                </div>
            </section>
        )

    }
}

export default Home
