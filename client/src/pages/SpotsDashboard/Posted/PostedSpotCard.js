import React from 'react';
import { Link } from "react-router-dom";

import PostedEdit from './PostedEdit';
import PostedRenters from './PostedRenters';

const PostedSpotCard = props => {
    return (
        <section key={props._id}>
            <div className="dashboard__user-item">
                <div className="dashboard__user-address">
                    <span className="dashboard-heading--value">{props.address}</span>
                </div>
                <div className="dashboard__user-buttons">

                    {/* Preview spot */}
                    <Link to={"/rentthisspot/" + props._id}>
                        <div className="dashboard-card__button dashboard-card__button--link" >
                            <span className="spot--test"><i className="fas fa-home spot--icon"></i></span>
                        </div>
                    </Link>

                    {/* Edit spot */}
                    <PostedEdit
                        _id={props._id}
                        address={props.address}
                        renter={props.renter}
                        updateSpot={props.updateSpot} />

                    {/* View renters */}
                    <PostedRenters spot={{ _id: props._id, renter: props.renter }} />

                    {/* Remove spot */}
                    <div className="dashboard-card__button dashboard-card__button--delete" onClick={() => props.deleteSpot(props._id)}>
                        <span className="spot--test"><i className="fas fa-trash-alt spot--icon"></i></span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostedSpotCard;