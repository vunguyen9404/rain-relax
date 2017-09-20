import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class MusicMedia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: this.props.volume || 1,
            setting: false
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
    }

    toggleRain() {
        let dispatch = this.props.dispatch;
        dispatch({
            type: 'TOGGLE_RAIN'
        });
    }

    toggleSetting(e) {
        if (e.target.nodeName != 'PROGRESSBAR' && e.target.nodeName != 'SPAN') {
            this.setState({setting: !this.state.setting});
        }
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
    }

    render() {
        let volumeClass = this.props.mute ? 'fa fa-volume-off':'fa fa-volume-up';
        let cloudClass = this.props.rain ? 'player-btn cloud act-cloud':'player-btn cloud';
        let volume = this.state.volume * 100;
        let setingClass = this.state.setting ? 'rain-setting show': 'rain-setting';
        let backgroundClass = this.state.setting ? 'background blur': 'background';
        return (
            <div className="player__media">
                <div className={backgroundClass} style={{backgroundImage: 'url('+ this.props.cover +')'}}></div>
                <div className="media-controls">
                    <a href="#" className="toogle-menu" title="Rainy Mood Setting" onClick={this.toggleSetting.bind(this)}><i className="fa-list-ul fa" aria-hidden="true"></i></a>
                </div>

                <div className={setingClass} onClick={this.toggleSetting.bind(this)}>
                    <button className="player-btn small volume" onClick={this.toggleMute.bind(this)} title="Mute/Unmute">
                        <i className={volumeClass} />
                    </button>

                    <progressbar className="volume-progress-container" onClick={this.setProgressVolume.bind(this)}>
                        <span className="volume-progress-value" style={{width: volume + '%'}}></span>
                    </progressbar>
                </div>
            </div>
        );
    }
}

module.exports = connect(function(state){
    return ({volume: state.volumeRain, mute: state.muteRain, rain: state.rain});
})(MusicMedia);