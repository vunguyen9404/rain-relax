'use trict'
var request = require('request');
var query = require('query-string');
var getStreamSoundCloud = (url, Callback) => {
    const client_id = 'ec8f5272bde9a225c71692a876603706';
    let params = {
        url: url,
        client_id: client_id
    }

    let options = {
        url: 'https://api.soundcloud.com/resolve.json?' + query.stringify(params),
        method: 'GET'
    }

    let req = new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })

    req.then(
        body => {
            Callback(null, client_id, body);
        },
        err => Callback(err)
    );
};

getStreamSoundCloud.search = (q,offset, limit, Callback) => {
    const client_id = 'ec8f5272bde9a225c71692a876603706';
    let params = {
        q: q,
        client_id: client_id,
        limit: limit,
        offset: offset
    }

    let options = {
        url: 'https://api.soundcloud.com/tracks?' + query.stringify(params),
        method: 'GET'
    }

    let req = new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })

    req.then(
        body => {
            Callback(null, client_id, body);
        },
        err => Callback(err)
    );
}

module.exports = getStreamSoundCloud;