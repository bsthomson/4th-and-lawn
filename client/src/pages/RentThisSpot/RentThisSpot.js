import React, { Component } from "react";
import './../../App.css';
import RentParkingSpot from "./../../components/Rent-Parking-Spot-Form";
import Popup from 'reactjs-popup';

class RentThisSpot extends Component {
    state = {
        parkingspot: [],
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
                        <Popup trigger={<span className="btn btn--rent">Log in</span>} modal>
                            {close => (
                              <div className="modal">
                                <a href="#" className="popup__close" onClick={close}>
                                  &times;
                                </a>
                                
                                <RentParkingSpot />
                                  <button
                                    className="button"
                                    onClick={() => {
                                      console.log('modal closed ')
                                      close()
                                    }}
                                  >
                                  </button>
                              </div>
                            )}
                          </Popup>
                            {/* <a className="">Reserve</a> */}
                        </div>
                    </div>
                    
                </div>
            </section>
        );
    }
}

export default RentThisSpot;
