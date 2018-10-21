import React, { Component } from "react";
import './../../App.css';
import API from "./../../utils/API";
import CardParkingSpot from './../../components/CardParkingSpot/ParkingSpot';
import moment from "moment";

class ParkingSpots extends Component {
    state = {
        parkingspots: [],
        events: [],
        game: ""
    };

    componentDidMount() {
        this.loadParkingSpots()
        this.loadEvents()
        console.log(this.state)
    }

    loadParkingSpots = () => {
        API.getParkingSpots()
            .then( response => {
                this.setState({ parkingspots: response.data })
            })
            .catch(err => console.log(err));
    };

    loadEvents = () => {        
        let parkingSpotArray = [];
        API.getJayhawkEvents()
            .then( response => {
                response.data.forEach(parkingSpot => {
                    console.log("parkingSpot response: ", parkingSpot)
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
            <section className="section-parking">
             {/* <div className="page-transition background-test"></div> */}

                <div className="row">

                    <div className="col-1-of-2">
                        <h1 className="heading-primary">
                            <span className="heading-primary--form">Parking spots</span>
                            <span className="dashboard-primary--body">These are your listings.</span>
                        </h1>
                    </div>

                    <div className="col-1-of-2">

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

                </div>

                
              <CardParkingSpot game={this.state.game}/>
            </section>
        );
    }
}

export default ParkingSpots;
