import React, { Component, PropTypes } from 'react';
import RainyMood from './RainyMood';

class HandleRainyMood extends React.Component {
    render() {
        return <Child {...this.props} />
    }
}