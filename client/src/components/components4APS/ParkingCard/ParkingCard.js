import React from "react";
import "./ParkingCard.css";

const ParkingCard = props => (
    <div className="card">
        <p>{props.address}</p>
        <p>{props.availablespots}</p>
        <p>{props.instructions}</p>
        {/*<p>{props.gameDay}</p> need to know what goes here*/}
    </div>
)

export default ParkingCard;