var React = require('react');
var ReactDOM = require('react-dom');
import ReactMusicPlayer from './ReactMusicPlayer';
import RainyMood from './RainyMood';

var songs = [
    {
        url: 'raw/2.mp3',
        cover: '',
        artist: {
            name: 'Huong Tram',
            song: 'Em Gai Mua'
        }
    },
    {
        url: 'raw/2.mp3',
        cover: '',
        artist: {
            name: 'Huong Tram',
            song: 'Em Gai Mua 1'
        }
    },
    {
        url: 'raw/2.mp3',
        cover: '',
        artist: {
            name: 'Huong Tram',
            song: 'Em Gai Mua 2'
        }
    },
    {
        url: 'raw/2.mp3',
        cover: '',
        artist: {
            name: 'Huong Tram',
            song: 'Em Gai Mua 3'
        }
    },
    {
        url: 'raw/2.mp3',
        cover: '',
        artist: {
            name: 'Huong Tram',
            song: 'Em Gai Mua 4'
        }
    }
]

var rainmood = [
    {
        url: 'raw/r1.m4a'
    }
]

ReactDOM.render(
    <div>
        <ReactMusicPlayer songs={songs} autoplay />
        <RainyMood songs={rainmood} autoplay />
    </div>,
    document.getElementById('root')
);