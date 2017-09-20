import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

class RainyMood extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: this.props.songs[0],
            current: 0
        }
    }

    componentDidMount() {
        let player = this.refs.player;
        player.volume = this.props.muteSound ? 0 : this.props.volume;
        player.addEventListener('ended', this.next.bind(this));
        player.addEventListener('error', this.next.bind(this));
    }

    componentWillUnmount(){
        let player = this.refs.player;
        player.volume = this.props.muteSound ? 0 : this.props.volume;
        player.addEventListener('ended', this.next.bind(this));
        player.addEventListener('error', this.next.bind(this));
    }

    next() {
        let total = this.props.songs.length;
        var current = this.state.current < total-1 ? this.state.current + 1 : 0;
        var active = this.props.songs[current];

        this.setState({active: active, current: current});
        this.refs.player.src = active.url;
        this.refs.player.play();
        this.refs.player.volume = this.props.muteSound ? 0 : this.props.volume;
    }

    render() {
        return (
            <audio src={this.state.active.url} autoPlay preload="auto" ref="player"></audio>
        );
    }
}

RainyMood.propTypes = {
    muteSound: PropTypes.bool.isRequired
};

module.exports = connect(function(state){
    return {songs: state.rainList, volume: state.volumeRain, muteSound: state.mute};
})(RainyMood);