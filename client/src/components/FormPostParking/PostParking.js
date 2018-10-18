import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            availablespots: '',
            price: '',
            instructions: '',
            game: '',
            events: [],
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get("/api/jayhawk")
            .then( response => {
                this.setState(
                    { events: response.data }
                )
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
            address: this.state.address,
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
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={this.state.address}
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