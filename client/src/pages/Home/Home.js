import React, { Component } from 'react';
import './../../App.css';
import '../../img/parking-garage.jpg';
import PostParkingSpot from '../../components/FormPostParking/PostParking';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
          loggedIn: false,
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

    render() {

        return (
            <div>
                {this.props.loggedIn ? (
                    <section className="section-home">
                    <PostParkingSpot />
                    </section>
                ) : (
                    <section className="section-home">
                    
                    </section>
                )}
            </div>
        )
    }
}

export default Home
