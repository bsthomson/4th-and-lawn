import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import CardParkingSpot from './../../components/CardParkingSpot/ParkingSpot';
import moment from "moment";

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

    sortDates = () => {
        moment(this.state.parkingspots.event.date).sort((a, b) => {return a - b})
    }

    render() {
        return (
            <section className="section-parking">
             {/* <div className="page-transition background-test"></div> */}

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
                                            key={game._id}
                                            id="game"
                                            name="event"
                                            placeholder="Game"
                                            value={game._id}>
                                                {game.event[0].event} {moment(game.event[0].date).format("MM-DD")}
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
