import React, { Component, PropTypes } from 'react';

class RainyMood extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: this.props.songs[0],
            current: 0,
            songs: this.props.songs
        }
    }
    componentDidMount() {
        let player = this.refs.player;
        player.volume = 0.4;
        player.addEventListener('ended', this.end.bind(this));
        player.addEventListener('error', this.next.bind(this));
    }

    componentWillUnmount(){
        let player = this.refs.player;
        player.volume = 0.4;
        player.addEventListener('ended', this.next.bind(this));
        player.addEventListener('error', this.next.bind(this));
    }

    next() {
        let total = this.state.songs.length;
        var current = this.state.current < total-1 ? this.state.current + 1 : 0;
        var active = this.state.songs[current];

        this.setState({active: active, current: current});
        this.refs.player.src = active.url;
        this.refs.player.play();
        this.refs.player.volume = 0.4;
    }
    render() {
        return (
            <audio src={this.state.active.url} autoPlay preload="auto" ref="player"></audio>
        );
    }
}

export default RainyMood;