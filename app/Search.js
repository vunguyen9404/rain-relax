import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Track from './Track';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            page: 1,
            offset: 16,
            tracks: []
        }
    }

    closeSearch() {
        let handler = this.props.handleClick;
        this.setState({isSearch: false, tracks:[]});
        let dispatch = this.props.dispatch;
        dispatch({type: 'SEARCH', searched: false});
        handler();
    }

    removeItem(index) {
        this.setState({tracks: this.state.tracks.filter((e, i) => i != index)});
        this.getMore();
    }

    search(e) {
        let q = this.refs.search.value;
        if (e.key == 'Enter' ) {
            fetch('http://rainrelax.cf/soundcloud/search?offset=0&limit=16&q='+q)
            .then((response) => response.json())
            .then((responseJson) => {
                let dispatch = this.props.dispatch;
                dispatch({type: 'SEARCH', searched: true});
                
                this.refs.search.value = '';
                this.refs.search.placeholder = q;

                this.setState({tracks: responseJson, isSearch: true});
            })
            .catch((error) => {
              console.error(error);
            });
        }
    }

    getMore() {
        let q = this.refs.search.placeholder;
        let offset = this.state.offset + 1;
        fetch('http://rainrelax.cf/soundcloud/search?offset='+ offset +'&limit=1&q='+q)
        .then((response) => response.json())
        .then((responseJson) => {
            let dispatch = this.props.dispatch;
            dispatch({type: 'SEARCH', searched: true});
            this.setState({tracks: [...this.state.tracks, ...responseJson], isSearch: true, offset: offset});
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
        var handlePlay = this.props.handlePlay;
        var classSearch = this.state.isSearch ? "search" : this.props.classSearch;
        return (
            <div className={classSearch}>
                <div className="container">
                    <div className="search-form">
                        <input type="text" placeholder="Search Track" ref="search" onKeyPress={this.search.bind(this)}/>
                        <a href="#" className="search-form__close" onClick={this.closeSearch.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></a>
                    </div>

                    <div className="row">
                        {this.state.tracks.map((song, i) => {
                            return (
                                <Track song={song} key={i} index={i} handlePlay={handlePlay} handleRemove={this.removeItem.bind(this)} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
        
    }
}

module.exports = connect(function(state){
    return ({searched: state.searched})
})(Search);