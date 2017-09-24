import React, { Component, PropTypes } from 'react';

class ButtonPaniPrev extends React.Component {
    clickTo() {
        let handle = this.props.handleClick;
        handle();
    }

    render() {
        let classPani = this.props.classPani;
        return(
            <a href="#" className={classPani} onClick={this.clickTo.bind(this)}>Prev</a>
        );
    }
}
module.exports = ButtonPaniPrev;