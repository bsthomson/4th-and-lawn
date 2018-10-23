import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './../../App.css';
import '../../img/parking-garage.jpg';
import PostParkingSpot from '../../components/FormPostParking/PostParking';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loggedIn: false,
        };
    }

    componentDidMount() {
        console.log("********",this.props.loggedIn);
        if (this.props.loggedIn === false) {
            this.setState({
                loggedIn: false
            })
        } else {
            this.setState ({
                loggedIn: true
            })
        }
    }

    render() {

        return (
            <div className="section-home">
                {this.props.loggedIn ? (
                    <div>
                    <section className="header">
                    <PostParkingSpot />
                    </section>
                    <section className="section-about">

                        <div className="section-about__container">

                            <div className="row">

                                <div className="col-1-of-2">
                                    <div className="section-about__container-flex-vertical-align">
                                        <h1 className="section-title">
                                            <span className="section-title--main">Take your time</span>
                                            <span className="section-title--body">There's nothing we can do about the traffic, but at least your parking spot is really good. Cheers to that.</span>
                                            {/* <span className="section-title--body">Your spot is waiting for you.</span> */}
                                        </h1>
                                        <span className="btn btn--main">Parking spots</span>
                                    </div>

                                </div>

                                <div className="col-1-of-2">

                                    <div className="section-about__container-small">
                                        
                                    
                                        {/* START CARD -> */}
                                        <div className="parking-card">
                                            <div className="parking-card__side parking-card__side--front">

                                                <div className="parking-card__banner">
                                                    <p className="spot--banner">Kansas vs Texas</p>
                                                </div>

                                                <div className="parking-card__picture">
                                                    <div className="parking-card__picture--1">&nbsp;</div>
                                                </div>

                                                <div className="parking-card__details">

                                                    <div className="row-container">
                                                        <div className="col-1-of-1">
                                                            <p className="spot--address">
                                                            1101 Mississippi St
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="row">

                                                        <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                <p className="spot--title">Price</p>
                                                                <div className="parking-card__button-price">
                                                                    <span className="spot--test">$20</span>
                                                                </div>
                                                            </div>         
                                                        </div>

                                                        <div className="col-1-of-3">
                                                            {/* <p className="spot--address">
                                                                {parkingspot.address}
                                                            </p> */}
                                                            <div className="spot-container">
                                                                <p className="spot--title">Spots</p>
                                                                <div className="parking-card__button-spot">
                                                                    <span className="spot--test">3</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-1-of-3">
                                                        <div className="spot-container">
                                                                <p className="spot--title">Rent</p>
                                                                <div className="parking-card__button-rent">
                                                                <i className="fas fa-car spot--value"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ^ END CARD ^ */}
                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>
                    </div>
                ) : (
                    <div>
                        <section className="header">
                            <div className="header__text-box">
                                <h1 className="header-primary">
                                    <span className="header-primary--main">Game day</span>
                                    <span className="header-primary--main">parking made</span>
                                    <span className="header-primary--main">easy.</span>
                                </h1>
                            </div>
                        </section>

                        <section className="section-about">

                            <div className="section-about__container">

                                <div className="row">

                                    <div className="col-1-of-2">
                                        <div className="section-about__container-flex-vertical-align">
                                            <h1 className="section-title">
                                                <span className="section-title--main">Take your time</span>
                                                <span className="section-title--body">There's nothing we can do about the traffic, but at least your parking spot is really good. Cheers to that.</span>
                                                {/* <span className="section-title--body">Your spot is waiting for you.</span> */}
                                            </h1>
                                            <span className="btn btn--main">Parking spots</span>
                                        </div>

                                    </div>

                                    <div className="col-1-of-2">

                                        <div className="section-about__container-small">
                                            
                                        
                                            {/* START CARD -> */}
                                            <div className="parking-card">
                                                <div className="parking-card__side parking-card__side--front">

                                                    <div className="parking-card__banner">
                                                        <p className="spot--banner">Kansas vs Texas</p>
                                                    </div>

                                                    <div className="parking-card__picture">
                                                        <div className="parking-card__picture--1">&nbsp;</div>
                                                    </div>

                                                    <div className="parking-card__details">

                                                        <div className="row-container">
                                                            <div className="col-1-of-1">
                                                                <p className="spot--address">
                                                                1101 Mississippi St
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="row">

                                                            <div className="col-1-of-3">
                                                                <div className="spot-container">
                                                                    <p className="spot--title">Price</p>
                                                                    <div className="parking-card__button-price">
                                                                        <span className="spot--test">$20</span>
                                                                    </div>
                                                                </div>         
                                                            </div>

                                                            <div className="col-1-of-3">
                                                                {/* <p className="spot--address">
                                                                    {parkingspot.address}
                                                                </p> */}
                                                                <div className="spot-container">
                                                                    <p className="spot--title">Spots</p>
                                                                    <div className="parking-card__button-spot">
                                                                        <span className="spot--test">3</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-1-of-3">
                                                            <div className="spot-container">
                                                                    <p className="spot--title">Rent</p>
                                                                    <div className="parking-card__button-rent">
                                                                    <i className="fas fa-car spot--value"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ^ END CARD ^ */}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        
                        </section>



                        {/* <section className="section-home">
                        <ScrollAnimation animateIn="zoomIn" offset="0">
                            <div class="header__text-box">
                                <h1 class="heading-primary">
                                    <span class="heading-primary--main">Game day parking made easy.</span>
                                </h1>
                            </div>
                        </ScrollAnimation>
                        </section> */}

                    </div>
                )}
            </div>
        )
    }
}

export default Home
