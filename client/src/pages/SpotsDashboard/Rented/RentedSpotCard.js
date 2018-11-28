import React from 'react';
import { Link } from 'react-router-dom';
import moment from "moment";

const encodeMapURL = (parkingLocation, userLocation) => {
    console.log({ parkingLocation });

    return (
        "https://www.google.com/maps/dir/" +
        userLocation.split(' ').join('+') + "/" +
        parkingLocation.split(' ').join('+')
    )
}

const RentedSpotCard = props => {
    return (
        <section key={props._id} >
            <div className="dashboard__user-item">
                <div className="dashboard__user-address">
                    <div className="row" style={{ color: "white" }}>
                        <div className="col-1-of-5">
                            <h2>{moment(props.date).format("hh:mm a")}</h2>
                        </div>
                        <div className="col-1-of-4">
                            <h2>{moment(props.date).format("MM-DD-YYYY")}</h2>
                        </div>
                        <div className="col-1-of-2">
                            <span className="dashboard-heading--value">{props.shortName}</span> <br></br>
                            <span className="dashboard-heading--value">{props.address}</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard__user-buttons">
                    <a href={encodeMapURL("Current Location", props.address)}>
                        <div className="dashboard-card__button dashboard-card__button--view" >
                            <span className="spot--test"><i class="fas fa-map-marker-alt spot--icon"></i></span>
                        </div>
                    </a>
                    <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => props.deleteRented(props._id)}>
                        <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default RentedSpotCard;