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
            <div>
                {this.props.loggedIn ? (
                    <section className="header">
                    <PostParkingSpot />
                    </section>
                ) : (
                    <div>
                    <section className="header">
                        <div className="header__text-box">
                            <h1 className="header-primary">
                                <span className="header-primary--main">Game day parking made easy.</span>
                            </h1>
                        </div>
                    </section>
                    <section className="section-about">
                        <div className="row">
                            <div className="col-1-of-2">
                                <div className="section__text-box">
                                    <h1 className="section-primary">
                                        <span className="section-primary--main">Take your time.</span>
                                        <span className="section-primary--body">Your spot is waiting for you.</span>
                                    </h1>
                                    <span className="btn btn--main">Parking spots</span>
                                </div>
                            </div>
                            <div className="col-1-of-2">
                            <div className="section__container">
                            <div className="parking-card">
                                    <div className="parking-card__side parking-card__side--front">

                                        <div className="parking-card__banner">
                                            <p className="spot--banner">Test</p>
                                        </div>

                                        <div className="parking-card__picture">
                                            <div className="parking-card__picture--1">&nbsp;</div>
                                        </div>

                                        <div className="parking-card__details">
                                            <div className="row-container">
                                                <div className="col-1-of-1">
                                                    <p className="spot--address">
                                                        Test
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-1-of-3">
                                                    <div className="spot-container">
                                                        <p className="spot--title">Price</p>
                                                        <div className="parking-card__button">
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
                                                        <div className="parking-card__button">
                                                            <span className="spot--test">Test</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1-of-3">
                                                    <div className="spot-container">
                                                    <p className="spot--title">Details</p>
                                                        <div className="parking-card__link">
                                                            <Link to=""></Link>
                                                        </div>
                                                            
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
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
