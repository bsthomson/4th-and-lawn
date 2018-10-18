import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import moment from "moment";

import CardParkingSpot from './../../components/CardParkingSpot/CardParkingSpot'

class ParkingSpots extends Component {
    state = {
        parkingspots: [],
    };

    componentDidMount() {
        this.loadParkingSpots()
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then(response => this.setState({ 
                parkingspots: response.data
            }))
            .catch(err => console.log(err));
    };

    sortDates = (game) => {
        console.log(game)
    }

    render() {
        return (
            <section className="section-parking">

            <h1 className="heading-page">
                <span className="heading-page--title">Available spots near Memorial Stadium</span>
            </h1>
                <form>
                    <div className="form__container" id="events">

                    <h1 className="heading-primary">
                        <span className="heading-primary--form left">Which game do you need parking for?</span>
                    </h1>
                        {this.state.parkingspots.length ? (
                            <div className="form__group">
                                <select name="game" className="form__input" value={this.state.game} onChange={this.handleChange}>
                                    <option>
                                        Pick a game to park at!
                                    </option>
                                    {this.state.parkingspots.map(game => (
                                        <option
                                            key={game}
                                            id="game"
                                            name="event"
                                            placeholder="Game"
                                            value={game}>
                                                {game} {moment(game).format("MM-DD")}
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
                    </div>   
                </form>

              <CardParkingSpot />
            </section>
        );
    }
}


export default ParkingSpots;
