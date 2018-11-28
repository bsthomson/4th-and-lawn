import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"
import { userInfo } from "os";

class ViewParkingSpot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renters: {},
        }

        console.log({ ViewParkingSpot: this.props });
        this.getRenterForSpot = this.getRenterForSpot.bind(this);
    }

    componentDidMount() {
        this.getRenterForSpot();
    }

    getRenterForSpot() {
        this.props.renters.forEach(renter => {
            API.getUser(renter)
                .then(userInfo => {
                    let tempRenters = this.state.renters;
                    tempRenters[renter] = userInfo.data;

                    this.setState({
                        renters: tempRenters
                    })

                    this.forceUpdate();
                })
        })
    }

    render() {
        const renters = this.state.renters;

        return (
            <div>
                {Object.keys(renters).length > 0 ? Object.keys(renters).map((id, idx) => (
                    <section key={idx}>
                        <div className="dashboard__user-item">
                            <div className="dashboard__user-address">
                                <div className="row" style={{ color: "white" }}>
                                    <div className="col-1-of-3">
                                        <h2>{renters[id].user.firstName} {renters[id].user.lastName}</h2>
                                        <div className="row">
                                            <h2>{renters[id].user.phoneNumber ? renters[id].user.phoneNumber : "(555) 555-5555"}</h2>
                                        </div>
                                    </div>
                                    <div className="col-1-of-6">
                                        <h2>{renters[id].user.carMake ? renters[id].user.carMake : "N/A"} / {renters[id].user.carModel ? renters[id].user.carModel : "N/A"}</h2>
                                        <div className="row">
                                            <h2>{renters[id].user.licensePlate ? renters[id].user.licensePlate : "N/A"}</h2>
                                        </div>
                                    </div>
                                    <div className="col-1-of-5 fluid-container">
                                        <div className="dashboard__user-buttons">
                                            <div className="dashboard-card__button dashboard-card__button--view">
                                                <span className="spot--test"><i class="far fa-eye spot--icon"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))
                    : (
                        <span className="dashboard-heading--value center" style={{ color: "black" }}>No renters for this spot</span>
                    )}
            </div>
        )
    }
}

export default ViewParkingSpot;