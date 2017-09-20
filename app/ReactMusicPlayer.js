import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';
import Song from './Song';
import MusicMedia from './MusicMedia';
import RainyMood from './RainyMood';
import Search from './Search';
import {connect} from 'react-redux';

class ReactMusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.songs[0],
            current: 0,
            progress: 0,
            activeIndex: 0,
            random: false,
            repeat: false,
            mute: false,
            reset: true,
            search: false,
            play: this.props.autoplay || false
        }
    }

    componentDidMount(){
        let playerElement = this.refs.player;
        playerElement.addEventListener('timeupdate', this.updateProgress.bind(this));
        playerElement.addEventListener('ended', this.end.bind(this));
        playerElement.addEventListener('error', this.next.bind(this));
    }

    componentWillUnmount(){
        let playerElement = this.refs.player;
        playerElement.removeEventListener('timeupdate', this.updateProgress.bind(this));
        playerElement.removeEventListener('ended', this.end.bind(this));
        playerElement.removeEventListener('error', this.next.bind(this));
    }

    setProgress(e){
        let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
        let width = target.clientWidth;
        let rect = target.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let duration = this.refs.player.duration;
        let currentTime = (duration * offsetX) / width;
        let progress = (currentTime * 100) / duration;

        this.refs.player.currentTime = currentTime;
        this.setState({ progress: progress });
        this.play();
    }

    updateProgress(){
        let duration = this.refs.player.duration;
        let currentTime = this.refs.player.currentTime;
        let progress = (currentTime * 100) / duration;

        this.setState({ progress: progress });

        let minCurrentTime = Math.floor(currentTime / 60);
        let secCurrentTime = Math.floor(currentTime % 60);
        if (secCurrentTime < 10) {
            secCurrentTime = '0' + String(secCurrentTime);
        }

        let minDurationTime = Math.floor(duration / 60);
        let secDurationTime = Math.floor(duration % 60);
        if (secDurationTime < 10) {
            secDurationTime = '0' + String(secDurationTime);
        }

        this.setState({ currentTime: minCurrentTime + ':' + secCurrentTime});
        this.setState({ durationTime: minDurationTime + ':' +secDurationTime });
    }

    play(){
        this.setState({ play: true });
        this.refs.player.play();
        console.log('Play');
    }

    pause(){
        this.setState({ play: false });
        this.refs.player.pause();
        console.log('pause');
    }

    toggle(){
        this.state.play ? this.pause() : this.play();
    }

    end(){
        (this.state.repeat) ? this.play() : this.next();
    }

    next(){
        var total = this.props.songs.length;
        var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
        var active = this.props.songs[current];

        this.setState({ current: current, active: active, progress: 0, activeIndex: current });

        this.refs.player.src = active.url;
        this.play();
    }

    previous(){
        var total = this.props.songs.length;
        var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
        var active = this.props.songs[current];

        this.setState({ current: current, active: active, progress: 0, activeIndex: current });

        this.refs.player.src = active.url;
        this.play();
    }

    randomize(){
        var s = shuffle(this.props.songs.slice());

        this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
    }

    repeat(){
        this.setState({ repeat: !this.state.repeat });
    }

    resetPlayList(){
        this.setState({ reset: !this.state.reset });
    }

    toggleMute(){
        let mute = this.props.mute;

        let dispatch = this.props.dispatch;
        dispatch({
            type: 'MUTE',
            mute: !mute
        });

        this.refs.player.volume = (mute) ? 1 : 0;
    }

    updateState(e) {
        let url = this.refs.url.value;
        if (url.includes('soundcloud.com') && e.key == 'Enter' ) {
            fetch('http://rainrelax.cf/soundcloud?url=' + url)
            .then((response) => response.json())
            .then((responseJson) => {
                let dispatch = this.props.dispatch;
                if (this.state.reset) {
                    dispatch({
                        type: 'ADD_LIST',
                        songs: responseJson
                    });
                    var active = this.props.songs[0];
                    this.setState({ current: 0, active: active, progress: 0, activeIndex: 0});
                    this.refs.player.src = this.props.songs[0].url;
                    this.refs.url.value = '';
                    this.refs.url.placeholder = url;
                    this.play(); 
                } else {
                    dispatch({
                        type: 'ADD_SONG',
                        song: responseJson
                    });
                    this.refs.url.value = '';
                    this.refs.url.placeholder = url;
                }
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }

    activeClick(i, props) {
        var current = i;
        if (this.state.current === current) {
            this.toggle();
        } else {
            var active = this.props.songs[current];
            this.setState({current: current, active: active, progress: 0, activeIndex: current});
            this.refs.player.src = this.props.songs[current].url;
            this.play();
        }
    }

    focusInput() {
        this.refs.url.focus();
    }

    search() {
        this.setState({search: !this.state.search});
    }

    playTrack(song) {
        this.setState({active: song, progress: 0});
        this.refs.player.src = song.url;
        this.play();
    }

    render() {
        const { active, play, progress } = this.state;

        let coverClass = classnames('player-cover', {'no-height': !!!active.cover });
        let playPauseClass = classnames('fa', {'fa-pause': play}, {'fa-play': !play});
        let volumeClass = classnames('fa', {'fa-volume-up': !this.props.mute}, {'fa-volume-off': this.props.mute});
        let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
        let randomClass = classnames('player-btn small random', {'active': this.state.random });
        let resetClass = classnames('player-btn small random', {'active': this.state.reset });
        let controlClass = this.state.play ? 'player-container player-container--play': 'player-container'

        let cover = active.cover ? active.cover.replace('-large', '-t500x500') : 'https://i.imgur.com/okHtWPU.jpg';

        let searchClass = this.state.search ? 'search search--active search-fixed': 'search search-fixed';
        let playlistClass = this.props.searched ? 'player none': 'player';

        return (
            <div>
                <Search classSearch={searchClass} handleClick={this.search.bind(this)} handlePlay={this.playTrack.bind(this)} />
                <div className={playlistClass}>
                    <MusicMedia handleKeyPress={this.updateState.bind(this)} cover={cover} />
                
                    <div className="playlist">
                        <div className="playlist__control">
                            <div className="playlist__online">
                                <button className="player-btn small repeat active" onClick={this.search.bind(this)} title="Search Track">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                                <button className="player-btn small repeat active" onClick={this.focusInput.bind(this)} title="Sound Cloud">
                                    <i className="fa fa-soundcloud" aria-hidden="true"></i>
                                </button>
                            </div>
                            <input type="text" placeholder="Paste link soundclound.." ref="url" onKeyPress={this.updateState.bind(this)}/>
                            <div className="playlist__button">
                                <button className={resetClass} onClick={this.resetPlayList.bind(this)} title="Option Reset Playlist">
                                    <i className="fa fa-refresh" aria-hidden="true"></i>
                                </button>

                                <button className={repeatClass} onClick={this.repeat.bind(this)} title="Repeat">
                                    <i className="fa fa-repeat" />
                                </button>

                                <button className={randomClass} onClick={this.randomize.bind(this)} title="Shuffle">
                                    <i className="fa fa-random" />
                                </button>
                           </div>
                        </div>
                        <div className="playlist-items">
                            {this.props.songs.map((song, i) => {
                                let classSong = this.state.activeIndex === i ? 'song-item song-item--active': 'song-item';
                                let classPlay = this.state.activeIndex === i && this.state.play ? 'fa fa-pause': 'fa fa-play';
                                let classDel = this.state.activeIndex === i ? null: 'fa fa-trash';
                                return (
                                    <Song classDel={classDel} classSong={classSong} key={i} indexSong={i} handleClick={this.activeClick.bind(this, i, this.props)} classPlay={classPlay} name={song.artist.song}/>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className={controlClass}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1">
                                <img src={cover} className="artist-thumb" />
                            </div>
                            <div className="col-md-7">
                                <div className="artist-info">
                                    <h2 className="artist-time artist-time--left">{this.state.currentTime}</h2>
                                    <h2 className="artist-time">{this.state.durationTime}</h2>
                                </div>
                                <div className="player-progress-container" onClick={this.setProgress.bind(this)}>
                                    <span className="player-progress-value" style={{width: progress + '%'}}></span>
                                </div>
                                <h6 className="artist-name">{active.artist.song}</h6>
                            </div>
                            <div className="col-md-4">
                                <div className="player-options">
                                    <div className="player-buttons player-controls">
                                        <button onClick={this.previous.bind(this)} className="player-btn medium" title="Previous Song">
                                            <i className="fa fa-backward" />
                                        </button>

                                        <button onClick={this.toggle.bind(this)} className="player-btn big" title="Play/Pause">
                                            <i className={playPauseClass} />
                                        </button>

                                        <button onClick={this.next.bind(this)} className="player-btn medium" title="Next Song">
                                            <i className="fa fa-forward" />
                                        </button>
                                    </div>

                                    <div className="player-buttons">
                                        <button className="player-btn small volume" onClick={this.toggleMute.bind(this)} title="Mute/Unmute">
                                            <i className={volumeClass} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <audio src={active.url} autoPlay={this.state.play} preload="auto" ref="player"></audio>
                <RainyMood ref="rain" />
            </div>
        );
    }
}

ReactMusicPlayer.propTypes = {
    autoplay: PropTypes.bool,
    songs: PropTypes.array.isRequired
};

module.exports = connect(function(state){
    return {songs: state.songList, mute: state.mute, searched: state.searched}
})(ReactMusicPlayer);
