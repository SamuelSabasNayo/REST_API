// my node start point

var express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    userRoute = require('./routes/user.route');

var port = 3000;

// connect to mongoDB
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo database');
});

mongoose.connection.on('error', (err) => {
    console.log(`Error at mongo: ${err}`);
});

var server = http.createServer(app);

// set public resources folder
app.use(express.static(__dirname + '/public'));

// add middleware
app.use(bodyParser.json());
app.use('/users', userRoute);

// set your first route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // res.send('Hello Nodemon!');
});

server.listen(port, () => {
    console.log(`Server is starting on port ${port}`);
});