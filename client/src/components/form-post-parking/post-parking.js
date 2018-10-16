import React, { Component } from "react";
import axios from "axios";

class PostParkingSpot extends Component {
    constructor() {
        super()
        this.state = {
            address: '',
            availablespots: '',
            instructions: '',
            game: '',
            jayhawk: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Component mounted")
        this.events();
    }

    events = () => {
        axios.get('/api/jayhawk')
        .then( response => {
            console.log(response)
            this.setState({
                jayhawk: response.data
            })
            console.log(this.state)
        })
        .catch( error => {
            console.log(error)
        })
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    // talk to Jolie about this...
    handleSubmit(event) {
        event.preventDefault();

        axios.post('/api/parkingspots', {
            address: this.state.address,
            availablespots: this.state.availablespots,
            instructions: this.state.instructions,
            game: this.state.game
        })
        .then(response => {
            console.log("parking spot info: ");
            console.log(response.data);
            if (response.status === 200) {
                console.log("Post Sent")
                this.setState({
                    redirectTo: "/parking-spots"
                })
            }
        }).catch(error => {
            console.log("Post error: ");
            console.log(error);
        })
    }

    render() {
        return (
        <div className="PostParkingSpotForm">

            <form>
                <div className="form__container">

                <h1 className="heading-primary">
                    <span className="heading-primary--form left">Game day parking made easy for everyone.</span>
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
                        <input className="form__input"
                            type="number"
                            id="availablespots"
                            name="availablespots"
                            placeholder="Parking spots available"
                            value={this.state.availablespots}
                            onChange={this.handleChange}
                        />
                    </div>
                    {/* <div className="form__group">
                            <input className="form__input"
                                type="text"
                                id="destination"
                                name="destination"
                                placeholder="Destination"
                                value={this.state.destination}
                                onChange={this.handleChange}
                            />
                    </div>*/}
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
                    {this.state.jayhawk.length ? (
                        <div className="form__group">
                            <select name="game" className="form__input">
                                {this.state.jayhawk.map(game => (
                                    <option
                                        key={game._id}
                                        id={game._id}
                                        name={game.event}
                                        value={game._id}>
                                            {game.event} {game.date}
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
                    {/*<div className="form__group">
                            <input className="form__input"
                                type="date"
                                id="date"
                                name="date"
                                placeholder="MM/DD/YYYY"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                    </div>
                    <div className="form__group">
                            <input className="form__input"
                                type="time"
                                id="time"
                                name="time"
                                placeholder="HH:MM"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                </div>*/}
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

export default PostParkingSpot;