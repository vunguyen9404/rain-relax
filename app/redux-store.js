var redux = require('redux');
var stateDefault = require('./state');
var reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return {...state, songList: [...state.songList, ...action.song]};
        case 'ADD_SINGLE_SONG':
            return {...state, songList: [...state.songList, action.song]};
        case 'ADD_LIST':
            return {...state, songList: action.songs};
        case 'CHANGE_VOLUME_RAIN':
            return {...state, volumeRain: action.volume};
        case 'REMOVE_SONG':
            return {...state, songList: state.songList.filter((e,i) => i != action.index)};
        case 'MUTE':
            return {...state, mute: action.mute};
        case 'SEARCH':
            return {...state, searched: action.searched};
        default:
    }
    return state;
}

var store = redux.createStore(reducer);
store.subscribe(() => console.log(store.getState()));
module.exports = store;