import React from 'react';
import Modal from 'react-modal';

const SignUpModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose={props.handleClearSelectedOption}
        contentLabel="Selected Option"
        >
        <h3>Selected Option</h3>
        <button onClick={props.handleClearSelectedOption}>Test</button>
    </Modal>
);

export default SignUpModal;