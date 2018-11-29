import React, { Component } from "react";
import API from "../../utils/API"

class ViewParkingSpot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renters: {},
        }

        console.log({ ViewParkingSpot: this.props });
        this.getRentersForSpot = this.getRentersForSpot.bind(this);
    }

    componentDidMount() {
        this.getRentersForSpot();
    }

    getRentersForSpot() {
        this.props.renters.forEach(renter => {
            API.getUser(renter)
                .then(userInfo => {
                    let tempRenters = this.state.renters;
                    tempRenters[renter] = userInfo.data;

                    this.setState({
                        renters: tempRenters
                    }, () => console.log({ViewParkingSpot: this.state}))

                    this.forceUpdate();
                })
        })
    }

    render() {
        const renters = this.state.renters;

        return (
            <div>
                <h1 className="heading-primary">
                    <span className="heading-primary--form center">{this.props.title}</span>
                </h1>
                {Object.keys(renters).length > 0 ? Object.keys(renters).map((id, idx) => (
                    <section key={idx}>
                        <div className="dashboard__user-item">
                            <div className="dashboard__user-address">
                                <div className="row" style={{ color: "white" }}>
                                    <div className="col-1-of-3">
                                        <h2>{renters[id].user.firstName} {renters[id].user.lastName}</h2>
                                        <div className="row">
                                            <h2>{renters[id].user.phoneNumber ? renters[id].user.phoneNumber : "Phone Number"}</h2>
                                        </div>
                                    </div>
                                    <div className="col-1-of-6">
                                        <h2>{renters[id].user.carMake ? renters[id].user.carMake : "Make"} / {renters[id].user.carModel ? renters[id].user.carModel : "Model"}</h2>
                                        <div className="row">
                                            <h2>{renters[id].user.licensePlate ? renters[id].user.licensePlate : "License Plate"}</h2>
                                        </div>
                                    </div>
                                    <div className="col-1-of-5 fluid-container">
                                        <div className="dashboard__user-buttons">
                                            <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => API.deleteRenter(this.props._id)}>
                                                <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
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