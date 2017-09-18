'use strict'
var firebase = require("firebase-admin");
var serviceAccount = require("../secret/rain-relax.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://rain-relax.firebaseio.com/"
});

var db = firebase.database();

module.exports = db;