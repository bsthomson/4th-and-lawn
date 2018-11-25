import React from "react";
import Popup from 'reactjs-popup';

import ParkingSpotForm from '../../../components/FormPostParking/ParkingSpotForm';

const PostedEdit = props => {
    return (
        <Popup trigger={
            <div className="dashboard-card__button dashboard-card__button--view" onClick={() => props.editPosted(props.spot._id)}>
                <span className="spot--test"><i class="fas fa-edit spot--icon"></i></span>
            </div>
        } modal>
            {close => (
                <div className="modal">
                    <a href="#" className="popup__close" onClick={close} >
                        &times;
                    </a>

                    <ParkingSpotForm
                        _id={props._id}
                        formTitle={"Edit Parking Spot Details"}
                        streetaddress={props.streetaddress}
                        city={props.city}
                        state={props.state}
                        zipcode={props.zipcode}
                        availableSpots={props.availablespots}
                        price={props.price}
                        instructions={props.instructions}
                        events={props.events}

                        handleChange={props.handleChange}
                        handleSubmit={props.updateSpot}

                        readOnly={true}
                    />
                    {/* <button
                        className="button"
                        onClick={() => {
                            console.log('Modal Closed')
                            close()
                        }}
                    >
                    </button> */}
                </div>
            )}
        </Popup>
    )
}

export default PostedEdit;