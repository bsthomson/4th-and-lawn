import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../../App.css';
import axios from 'axios';

class UserSpot extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loggedIn: false,
          postedspots: [],
          rentedspots: []
        };
      }

    componentDidMount() {
        console.log("********",this.props.loggedIn);
        if (this.props.loggedIn === false) {
            this.setState({
                loggedIn: false
            })
        } else {
            this.setState ({
                loggedIn: true
            })
        }
    }


    componentDidMount() {
        this.loadPostedSpots();
    }

    loadPostedSpots = () => {
        axios.get("/api/postedspots")
            .then(response => this.setState({             
                postedspots: response.data[0].parkingspots
            }))
            .catch(err => console.log(err));
    };

    deletePostedSpot = id => {
        axios.delete("/api/postedspots/" + id)
        .then(response => this.loadPostedSpots())
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="section-dashboard">
                <div className="dashboard__sidebar">

                    <div className="dashboard__container">
                        <h1 className="heading-primary">
                            <span className="heading-primary--form-white">Dashboard</span>
                        </h1>
                    </div>

                </div>

                <div className="dashboard__main">
                    <div className="row">
                        <div className="col-1-of-1">
                        
                            <div className="dashboard__container">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--form">Parking spots</span>
                                    <span className="dashboard-primary--body">These are your listings.</span>
                                </h1>

                            {/* START */}
                            {this.state.postedspots.length ? (
                                <div className="row">
                                    {this.state.postedspots.map(postedspot => (
                                            <div className="col-1-of-1" key={postedspot._id}>
                                                <div className="dashboard-card">

                                                        <div className="dashboard-card__details">
                                                            <div className="col-1-of-3">
                                                                <span className="dashboard-details dashboard-details--sub">{postedspot.streetaddress}</span>
                                                            </div>

                                                            <div className="col-1-of-3">
                                                                <span className="dashboard-details dashboard-details--sub">Available spots: {postedspot.availablespots}</span> 
                                                            </div>

                                                            <div className="col-1-of-3">
                                                            <div className="dashboard-card__link" >
                                                                    <div className="btn btn--delete" onClick={() => this.deletePostedSpot(postedspot._id)}>
                                                                        <i class="fas fa-trash-alt spot--icon"></i>
                                                                    </div>
                                                                </div>     

                                                                <div className="dashboard-card__link" >
                                                                    <Link to={"/rentthisspot/" + postedspot._id}>
                                                                        <div className="btn btn--spot" >
                                                                            <i class="fas fa-home spot--icon"></i>
                                                                        </div>
                                                                    </Link>
                                                                </div>                             
                                                            </div>
                                                        </div>
                                                   
                                                </div>
                                            </div>
                                    ))}
                                </div>
                            ) : (
                            <h3>No Results to Display</h3>
                            )}
                            {/* END */}
                            </div>
                        </div>

                    <div className="col-1-of-1">
                        <div className="dashboard__container">
                            <h1 className="heading-primary">
                                <span className="heading-primary--form">Rented spots</span>
                                <span className="dashboard-primary--body">These are your reserved spots. Enjoy.</span>
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        );
    }
}

export default UserSpot;
