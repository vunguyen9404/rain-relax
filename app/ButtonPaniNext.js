import React, { Component, PropTypes } from 'react';

class ButtonPaniNext extends React.Component {
    clickTo() {
        let handle = this.props.handleClick;
        handle();
    }

    render() {
        let classPani = this.props.classPani;
        return(
            <a href="#more" className={classPani} onClick={this.clickTo.bind(this)}>More..</a>
        );
    }
}
module.exports = ButtonPaniNext;