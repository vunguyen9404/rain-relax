var express = require('express');
var app = express();

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

