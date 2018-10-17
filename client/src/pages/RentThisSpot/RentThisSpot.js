import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';
import axios from 'axios';

class RentThisSpot extends Component {
    state = {
        parkingspot: [],
    };

    getParkingSpot = () => {
        axios.get("/api" + window.location.pathname)
        .then(response => this.setState({ 
            parkingspots: response.data
        }))
        .catch(err => console.log(err));
    };

    render() {
        return (
            <section>
                <div className="footer-reservation">
                    <div className="row">
                        <div className="col-3-of-4">
                            &nbsp;
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
