import React from "react";
import "./ParkingCard.css";

const ParkingCard = props => (
    <div onClick={} className="parkingCard">
        <div className="prk-container">
            <p><strong>{props.address}</strong></p>
            <p><strong>{props.availablespots}</strong></p>
            <p>{props.instructions}</p>
            <p>{props.game}</p>
        </div>
    </div>
);

export default ParkingCard;