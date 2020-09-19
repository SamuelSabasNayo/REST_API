const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

// error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
    // console.log(err);
});

// listen for  requests
app.listen(process.env.port || 4000, () => {
    console.log('Server is listening for requests');
});




// const express = require('express');

// // set up express app
// const app = express();

// app.get('/api', (req, res) => {
//     console.log('GET request');
//     res.end();
// });

// // listen for  requests
// app.listen(process.env.port || 4000, () => {
//     console.log('Server is listening for requests');
// });