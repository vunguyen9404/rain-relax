var React = require('react');
var ReactDOM = require('react-dom');
import ReactMusicPlayer from './ReactMusicPlayer';
var Provider = require('react-redux').Provider;
var store = require('./redux-store.js');
var Rain = require('./Rain');

class RainRelax extends React.Component {
    render() {
        return (
            <ReactMusicPlayer autoplay/>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <RainRelax />
    </Provider>,
    document.getElementById('root')
);

ReactDOM.render(<Provider store={store} >
    <Rain/>
</Provider>, document.getElementById('rain-wrap'));