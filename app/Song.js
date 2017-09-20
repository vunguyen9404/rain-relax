import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class Song extends React.Component {
    constructor(props) {
        super(props);
    }

    activeIndex() {
        let index = this.props.indexSong;
        let handle = this.props.handleClick;
        handle(index, null);
    }

    removeItem() {
        let index = this.props.indexSong;
        let dispatch = this.props.dispatch;
        dispatch({type: 'REMOVE_SONG', index});
    }

    render () {
        return (
            <div className={this.props.classSong}>
                <i className={this.props.classPlay} onClick={this.activeIndex.bind(this)} aria-hidden="true"></i><span onClick={this.activeIndex.bind(this)} className="song-item__name">{this.props.name}</span>
                <span className="song-item__time">{this.props.time}</span>
                <a href="#" className="song-item__action-remove" onClick={this.removeItem.bind(this)} ><i className={this.props.classDel} aria-hidden="true"></i></a>
            </div>
        );
    }
}

module.exports = connect()(Song);