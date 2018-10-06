import React from "react";

const FormBtn = props => (
    <button type={props.type} onClick={props.clickHandler} className="btn btn-primary col-1 col-mr-auto">
        {props.children}
    </button>
)

export default FormBtn;

