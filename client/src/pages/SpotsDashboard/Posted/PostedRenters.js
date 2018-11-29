import React, { Component } from "react";
import Popup from 'reactjs-popup';
import ViewParkingSpot from '../../../components/ViewParking/ViewParkingSpot';

const PostedRenters = props => {
    return (
        <Popup trigger={
            <div className="dashboard-card__button dashboard-card__button--view" onClick={() => props.viewPosted(props.spot._id)}>
                <span className="spot--test"><i class="far fa-eye spot--icon"></i></span>
            </div>
        } modal>
            {close => (
                <div className="modal">
                    <a href="#" className="popup__close" onClick={close} >
                        &times;
                    </a>

                    <ViewParkingSpot title="View Renter Information" renters={props.spot.renter} />
                    <button
                        className="button"
                        onClick={() => {
                            console.log('Modal Closed')
                            close()
                        }}
                    >
                    </button>
                </div>
            )}
        </Popup>
    )
}

export default PostedRenters;