var React = require('react');
var ReactDOM = require('react-dom');
import ReactMusicPlayer from './ReactMusicPlayer';
import RainyMood from './RainyMood';

class RainRelax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultSong: [
                {
                    url: 'raw/1.mp3',
                    artist: {
                        name: 'Redfoo',
                        song: 'New Thang'
                    }
                }
            ],
            rainmood: [
                {
                    url: 'raw/r1.mp3'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <ReactMusicPlayer songs={this.state.defaultSong} autoplay />
                <RainyMood songs={this.state.rainmood} autoplay />
            </div>
        );
    }
}

ReactDOM.render(
    <RainRelax />,
    document.getElementById('root')
);