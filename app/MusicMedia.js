import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class MusicMedia extends React.Component {
    updateState(e) {
        let url = this.refs.url.value;
        let handle = this.props.handleKeyPress;
        handle(e, url);
    }

    render() {
        return (
            <div className="player__media">
                <div className="background" style={{backgroundImage: 'url('+ this.props.cover +')'}}></div>
                <div className="media-controls">
                    <a href="#" className="toogle-menu" title="Rainy Mood Setting"><i className="fa fa-list-ul" aria-hidden="true"></i></a>
                </div>
            </div>
        );
    }
}

module.exports = connect()(MusicMedia);