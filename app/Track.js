import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class Track extends React.Component {
    playTrack() {
        let handle = this.props.handlePlay;
        let song = this.props.song;
        handle(song);
    }

    addList() {
        let song = this.props.song;
        let dispatch = this.props.dispatch;
        dispatch({type: 'ADD_SINGLE_SONG', song: song});

        let handleRemove = this.props.handleRemove;
        handleRemove(this.props.index);
    }

    render() {
        let minDurationTime = Math.floor(this.props.song.duration / 60000);
        let secDurationTime = Math.floor(this.props.song.duration % 60);
        if (secDurationTime < 10) {
            secDurationTime = '0' + String(secDurationTime);
        }

        let duration = minDurationTime + ':' + secDurationTime;
        let cover = this.props.song.cover ? this.props.song.cover.replace('-large', '-t500x500') : 'https://unsplash.it/500/500';
        return(
            <div className="col-md-4 col-lg-3">
                <div className="track-card track-card--compact">
                    <div className="track-card__image">
                        <img src={cover} />
                    </div>
                    
                    <div className="track-card__main">
                        <div className="track-card__username">
                            <a href="#">{this.props.song.username}</a>
                        </div>
                        <h2 className="track-card__title">{this.props.song.artist.song}</h2>
                        <div className="track-card__action">
                            <div className="track-card__reaction">
                                <a href="#play" className="track-card__btn" onClick={this.playTrack.bind(this)}><i className="fa fa-play" aria-hidden="true"></i></a>
                                <span>{duration}</span>
                            </div>
                            <div className="track-card__addlist">
                                <a href="#list" className="track-card__btn" onClick={this.addList.bind(this)}><i className="fa fa-plus" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect(function(state){
    return ({songList: state.songList})
})(Track);