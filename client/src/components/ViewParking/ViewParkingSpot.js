import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"

class ViewParkingSpot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renters: this.props.renters,
        }

        console.log({ renters: this.props.renters });
    }

    getRentersForSpot = () => {
        // API.get
    }

    render() {
        return (
            <div>
                {this.props.renters.map(renter => (
                    <section key={renter._id}>
                        <div className="dashboard__user-item">
                            <div className="dashboard__user-address">
                                <div className="row" style={{ color: "white" }}>
                                    <div className="col-1-of-2">
                                        <span className="dashboard-heading--value">{renter.licenseplate} {renter.make} {renter.model}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard__user-buttons">
                                <div className="dashboard-card__button dashboard-card__button--view">
                                    <span className="spot--test"><i class="far fa-eye spot--icon"></i></span>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        )
    }
}

export default ViewParkingSpot;