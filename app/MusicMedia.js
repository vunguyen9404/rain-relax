import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class MusicMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: this.props.volume || 1
        }
    }
    updateState(e) {
        let url = this.refs.url.value;
        let handle = this.props.handleKeyPress;
        handle(e, url);
    }

    toggleMute(){
        let mute = this.props.mute;

        let dispatch = this.props.dispatch;
        dispatch({
            type: 'MUTE_RAIN',
            mute: !mute
        });

        this.refs.player.volume = (mute) ? 1 : 0;
    }

    toggleRain() {
        let dispatch = this.props.dispatch;
        dispatch({
            type: 'TOGGLE_RAIN'
        });
    }

    setProgressVolume(e){
        let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let volumeMax = 1;
        let volumeCurrent = (volumeMax * offsetX) / width;
        let volume = volumeCurrent;

        let dispatch = this.props.dispatch;
        dispatch({type: 'SET_VOLUME_RAIN', volume})
        this.setState({volume: volume});
        this.refs.player.volume = volume;
    }

    render() {
        let volumeClass = this.props.mute ? 'fa fa-volume-off':'fa fa-volume-up';
        let cloudClass = this.props.rain ? 'player-btn cloud act-cloud':'player-btn cloud';
        let volume = this.state.volume * 100;
        return (
            <div className="player__media">
                <div className="background" style={{backgroundImage: 'url('+ this.props.cover +')'}}></div>
                <div className="media-controls">
                    <button className="player-btn small volume" onClick={this.toggleMute.bind(this)} title="Mute/Unmute">
                        <i className={volumeClass} />
                    </button>

                    <div className="volume-progress-container" onClick={this.setProgressVolume.bind(this)}>
                        <span className="volume-progress-value" style={{width: volume + '%'}}></span>
                    </div>

                    <a href="#" className="toogle-menu" title="Rainy Mood Setting"><i className="fa fa-cloud" aria-hidden="true"></i></a>
                </div>
            </div>
        );
    }
}

module.exports = connect(function(state){
    return ({volume: state.volumeRain, mute: state.muteRain, rain: state.rain});
})(MusicMedia);