var express = require('express');
var app = express();

var soundcloud = require('./app/SoundCloud');
var db = require('./app/FireBase');

// Create NodeJs server
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");



app.listen(3000, () =>{
    console.log('Server listening on port 3000...');
})

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/soundcloud', (req, res) => {
    let url = req.query.url;
    soundcloud(url, (err, id, body) => {
        if (err) return console.log(err);
        var body = JSON.parse(body);
        if (body.kind) {
            let songs = [
                {
                    url: body.stream_url + '?client_id=' + id,
                    cover: body.artwork_url,
                    artist: {
                        song: body.title
                    }
                }
            ];
            res.send(songs);
        } else {
            let tracks = body.tracks;
            let songs = new Array();
            tracks.map((body, index) => {
                let song =  {
                    url: body.stream_url + '?client_id=' + id,
                    cover: body.artwork_url,
                    artist: {
                        song: body.title
                    }
                }
                songs.push(song)
            });
            
            res.send(songs)
        }
    })
})

app.get('/songlist', (req, res) => {
    var ref = db.ref('id');
    ref.once("value", function(snapshot) {
        res.send(snapshot.val());
    });
})