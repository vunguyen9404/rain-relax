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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/soundcloud', (req, res) => {
    let url = req.query.url;
    soundcloud(url, (err, id, body) => {
        if (err) return console.log(err);
        var body = JSON.parse(body);
        if (body.kind == "track") {
            let songs = [
                {
                    url: body.stream_url + '?client_id=' + id,
                    cover: body.artwork_url,
                    duration: body.duration,
                    username: body.user.username,
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
                    duration: body.duration,
                    username: body.user.username,
                    artist: {
                        song: body.title
                    }
                }
                songs.push(song)
            });

            res.send(songs);
        }
    })
})

app.get('/soundcloud/search', (req, res) => {
    let q = req.query.q;
    let offset = parseInt(req.query.offset);
    let limit = parseInt(req.query.limit);
    soundcloud.search(q, offset,limit ,(err,id,body) => {
        if (err) return console.log(err);
        var body = JSON.parse(body);

        let songs = new Array();
        body.map((body, index) => {
            let song =  {
                url: body.stream_url + '?client_id=' + id,
                cover: body.artwork_url,
                duration: body.duration,
                username: body.user.username,
                artist: {
                    song: body.title
                }
            }
            songs.push(song)
        });

        res.send(songs);
    });
})

app.get('/songlist', (req, res) => {
    var ref = db.ref('id');
    ref.once("value", function(snapshot) {
        res.send(snapshot.val());
    });
})