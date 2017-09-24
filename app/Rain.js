import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class Rain extends React.Component {
    render() {
        let idRain = this.props.rain ? 'rain':null;
        return(
            <div className="thunder">
                <canvas id={idRain}></canvas>
            </div>
        );
    }
}

module.exports = connect(function(state) {
    return ({rain: state.rain});
})(Rain);