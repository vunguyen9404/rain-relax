var React = require('react');
import {connect} from 'react-redux';
class Rain extends React.Component {
    render() {
        let id  = this.props.rain ? 'rain':null;
        return (
            <div className="thunder"><canvas id={id}></canvas></div>
        );
    }
}

module.exports = connect(function(state){
    return ({rain: state.rain})
})(Rain);
