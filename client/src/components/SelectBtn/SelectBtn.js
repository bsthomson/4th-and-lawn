import React from "react";
import "./SelectBtn.css";

const SelectBtn = props => (
    <button
        onclick={props.Onclick}
        className={"card-btn"}
     />
);

export default SelectBtn;
