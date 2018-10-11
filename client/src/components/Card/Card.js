import React from "react";
import React from "react";
import "./Card.css";
import "../../../../routes/apiRoutes";
import Wrapper from "../Wrapper";
import ParkingCard from "../ParkingCard";


class Card extends Component {
    render() {
      return (
        <Wrapper>
            <title>Avalible Spot</title>
            <ParkingCard 
                id={}
                key={}
                name={}
            />
            <SelectBtn />
        </Wrapper>
        );  
    }
}

export default Card;


