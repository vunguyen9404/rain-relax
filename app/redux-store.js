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
        case 'MUTE_MUSIC':
            return {...state, muteMusic: action.mute};
        case 'MUTE_RAIN':
            return {...state, muteRain: action.mute};
        case 'SET_VOLUME_MUSIC':
            return {...state, volumeMusic: action.volume};
        case 'SET_VOLUME_RAIN':
            return {...state, volumeRain: action.volume};
        case 'SEARCH':
            return {...state, searched: action.searched};
        case 'TOGGLE_RAIN':
            return {...state, rain: !state.rain};
        default:
    }
    return state;
}

var store = redux.createStore(reducer);
store.subscribe(() => console.log(store.getState()));
module.exports = store;