import React, { Component } from 'react';
import './../../App.css';
import '../../img/parking-garage.jpg';
import PostParkingSpot from '../../components/FormPostParking/PostParking';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

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
                    <div>
                    <section className="header">
                        <div className="header__text-box">
                            <h1 className="header-primary">
                                <span className="header-primary--main">Game day parking made easy.</span>
                            </h1>
                        </div>
                    </section>
                    {/* <section className="section-home">
                    <ScrollAnimation animateIn="zoomIn" offset="0">
                        <div class="header__text-box">
                            <h1 class="heading-primary">
                                <span class="heading-primary--main">Game day parking made easy.</span>
                            </h1>
                        </div>
                    </ScrollAnimation>
                    </section> */}
                    </div>
                )}
            </div>
        )
    }
}

export default Home
