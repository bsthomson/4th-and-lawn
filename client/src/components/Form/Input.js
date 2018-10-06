import React from "react";

const Input = props => (
    <div className="input-field">
        <input 
        className="form-input"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placehoder}
        onChange={props.handleChange}
        />
    </div>
);

export default Input;