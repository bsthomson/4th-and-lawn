import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class RentParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            licenseplate: '',
            make: '',
            model: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        axios.post("/api" + window.location.pathname, {
            licenseplate: this.state.licenseplate,
            make: this.state.make,
            model: this.state.model
        })
        .then(response => {
            console.log('Renters info: ');
            console.log(response.data);
            if(response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: '/posted-spots'
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        });
    };

    // React render function
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <form>
                        <p className="heading-primary">
                            <span className="heading-primary--form center">Rent this spot</span>
                        </p>

                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="licenseplate"
                                        name="licenseplate"
                                        placeholder="License plate number"
                                        value={this.state.licenseplate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="make"
                                        name="make"
                                        placeholder="Car make"
                                        value={this.state.make}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form__group">
                                    <input className="form__input"
                                        type="text"
                                        id="model"
                                        name="model"
                                        placeholder="Car model"
                                        value={this.state.model}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input
                                    className="btn btn--form"
                                    type="submit"
                                    value="Submit"
                                    onClick={this.handleSubmit}
                                />
                        </form>
                </div>
            )
        }
    }
}

export default RentParkingSpot;