import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import CardParkingSpot from './../../components/CardParkingSpot/ParkingSpot';
import moment from "moment";
import GoogleMap from "./../../components/GoogleMap/GoogleMap";


class ParkingSpots extends Component {
    state = {
        parkingspots: [],
        events: [],
        game: ""
    };

    componentDidMount() {
        this.loadParkingSpots()
        this.loadEvents()
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then( response => {
                console.log(response.data)
                this.setState({ parkingspots: response.data })
            })
            .then( console.log(this.state.parkingspots))
            .catch(err => console.log(err));
    };

    loadEvents = () => {        
        let parkingSpotArray = [];
        API.getJayhawkEvents()
            .then( response => {
                response.data.forEach(parkingSpot => {
                    if (moment(parkingSpot.date) > moment()) {
                        parkingSpotArray.push(parkingSpot)
                    }
                });
            })
            .then( () => this.setState({
                events: parkingSpotArray
            }))
            .catch(err => console.log(err))
    }

    handleChange = event => {
        this.setState({
            game: event.target.value
        });
    };

    render() {
        return (
            <section>
                <div className="section-header">&nbsp;</div>

                <div className="section-parking">
                
                    <div className="parking__container">
                        {/*  START PAGE HEADER -> */}
                        <section  className="parking__header">
                           
                            <div className="parking__heading">
                                <h1 className="heading-primary">
                                    <span className="heading-primary--page">Parking spots</span>
                                </h1>
                            </div>
                            

                            <div className="parking__filter">
                            <form>
                                <div className="form__filter-container" id="events">                        
                                    {this.state.events.length ? (                    
                                        <div className="form__group">
                                            <select name="game" className="form__input" value={this.state.event} onChange={this.handleChange}>
                                                <option>
                                                    Filter by game
                                                </option>
                                                {this.state.events.map(game => (
                                                    <option
                                                        key={game._id}
                                                        id="game"
                                                        name="event"
                                                        placeholder="Game"
                                                        value={game._id}>
                                                        {moment(game.date).format("MM-DD")} {game.event}
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
                        </div>
                    </section>
                    {/* ^ END PAGE HEADER ^ */}

                    <section className="parking__content">

                    <CardParkingSpot game={this.state.game}/>

                    </section>
                    {/* END DASHBOARD USER CONTENT */}

                </div>
            </div>

            </section>
        );
    }
}

export default ParkingSpots;
