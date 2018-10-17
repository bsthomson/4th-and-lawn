import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';
import GoogleMap from './../../components/GoogleMap/GoogleMap';
import axios from 'axios';

class RentThisSpot extends Component {
    state = {
        parkingspots: []
    };

    componentDidMount() {
        this.getParkingSpot();
    }

    getParkingSpot = () => {
        axios.get("/api/" + window.location.pathname)
        .then(response => {
            this.setState({ 
            parkingspots: response.data
            }) 
            console.log(response.data)
        })
        .catch(err => console.log(err));
    };

    render() {
        return (
            <section className="section-rent">

                <div className="row">
                    <div className="col-1-of-3">
                        <div className="header-page">
                            <div className="header-page__background">
                                <p className="parking-details--address">
                                    {this.state.parkingspots.address}
                                </p>
                                <h1 className="heading-primary">
                                    <span className="heading-primary--page">
                                    Game day parking made easy
                                    </span>
                                </h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-2-of-3">
                        <div className="header-page">
                            <div className="header-page__background-image"></div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1-of-3">
                        
                    </div>
                    <div className="col-1-of-3">
                        
                    </div>
                    <div className="col-1-of-3">
                        {/* <h3 className="heading-primary">
                            <span className="heading-primary--form center">
                                Placeholder
                            </span>
                        </h3> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-1-of-1">
                        <h3 className="heading-primary">
                            <span className="heading-primary--form">
                                Location
                            </span>
                        </h3>
                        <GoogleMap />
                    </div>
                </div>

                
                <div className="footer-reservation">
                    <div className="row">
                        <div className="col-3-of-4">
                        <p className="parking-details--address">
                            {this.state.parkingspots.address}
                        </p>
                        </div>
                    
                        <div className="col-1-of-4">
                        <Popup trigger={<span className="btn btn--rent">Reserve Spot</span>} modal>
                            {close => (
                              <div className="modal">
                                <a href="#" className="popup__close" onClick={close}>
                                  &times;
                                </a>
                                <RentParkingSpot />
                                  <button
                                    className="button"
                                    onClick={() => {
                                      console.log('modal closed')
                                      close()
                                    }}
                                  >
                                  </button>
                              </div>
                            )}
                          </Popup>
                        </div>
                    </div>
                    
                </div>
            </section>
        );
    }
}

export default RentThisSpot;



