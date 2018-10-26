import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import API from "../../utils/API"

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            streetaddress: '',
            city: '',
            state: '',
            zipcode: '',
            availablespots: '',
            instructions: '',
            game: '',
            events: [],
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.noOldDates();
    }

    noOldDates = () => {
        let parkingSpotArray = [];
        API.getJayhawkEvents()
            .then(response => {
                response.data.forEach(parkingSpot => {
                        if (moment(parkingSpot.date) > moment()) {
                            parkingSpotArray.push(parkingSpot)
                        }
                })
            })
            .then( () => {
                this.setState(
                    { events: parkingSpotArray }
                )
            })
            .catch( err => {
                console.log(err)
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state)

        axios.post('/api/parkingspots', {
            streetaddress: this.state.streetaddress,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            availablespots: this.state.availablespots,
            price: this.state.price,
            instructions: this.state.instructions,
            event: this.state.game
        })
        .then(response => {
            console.log("parking spot info: ");
            console.log(response.data);
            if (response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/posted-spots"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to ={{ pathname: this.state.redirectTo }} />
        } else {
            return (
            <div className="PostParkingSpotForm">

                <form>
                    <div className="form__container" id="parkingspotform">

                    <h1 className="heading-primary">
                        <span className="heading-primary--form left">List your parking spots before game day.</span>
                    </h1>

                    <div className="form__group">
                        <input className="form__input"
                            type="text"
                            id="streetaddress"
                            name="streetaddress"
                            placeholder="Address"
                            value={this.state.streetaddress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input-xs"
                            type="city"
                            id="city"
                            name="city"
                            placeholder="Lawrence"
                            value="Lawrence"
                            onChange={this.handleChange}
                        />
                        <input className="form__input-xs"
                            type="text"
                            id="state"
                            name="state"
                            placeholder="KS"
                            value="KS"
                            onChange={this.handleChange}
                        />
                        <input className="form__input-xs"
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            placeholder="66044"
                            value="66044"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input-sm"
                            type="number"
                            id="availablespots"
                            name="availablespots"
                            placeholder="Number of spots"
                            value={this.state.availablespots}
                            onChange={this.handleChange}
                        />
                        <input className="form__input-sm"
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Price"
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <input className="form__input"
                            type="text"
                            id="instructions"
                            name="instructions"
                            placeholder="Parking instructions"
                            value={this.state.instructions}
                            onChange={this.handleChange}
                        />
                    </div>
                    {this.state.events.length ? (
                        <div className="form__group">
                            <select name="game" className="form__input" value={this.state.game} onChange={this.handleChange}>
                                <option>
                                    Select a game
                                </option>
                                {this.state.events.map(game => (
                                    <option
                                        key={game._id}
                                        id="game"
                                        name="event"
                                        placeholder="Game"
                                        value={game._id}>
                                        {game.event} {moment(game.date).format("MM-DD")}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="form__group">
                            <select name="game" className="form__input">                                
                                <option>
                                    No Games Available
                                </option>                            
                             </select>
                        </div>
                    )}
                    <div className="form__group">
                        <input
                            className="btn btn--form"
                            type="submit"
                            value="Submit"
                            onClick={this.handleSubmit}
                        />
                    </div>
                    </div>   
                </form>
            </div>
            )
        }
    }
}

export default PostParkingSpot;