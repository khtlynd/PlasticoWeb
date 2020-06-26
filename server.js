//var http = require('http');
//var fs = require('fs');
var express = require('express');
var app = express();
const path = require("path")
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/static', express.static('views/'));

app.get('/', function(req, res) {
    res.redirect('/login');
})

// include router
const loginRouter = require("./routes/loginRouter")
    // routing
app.use("/", loginRouter)

app.listen(8080);
console.log('Listening to port... Successfull!');