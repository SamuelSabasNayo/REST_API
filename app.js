const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// connect mongodb
mongoose.connect('mongodb://localhost:27017/node-rest-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
});

mongoose.connection.on('error', (error) => {
  console.log(`Error at mongo: ${error}`);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


// CORS: cross Origin Ressource Sharing

app.use((req, res, next) => {
    res.header("Access-Control-Allow_Origin", "*");
    res.header("Access-Control-Allow_Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// listen for requests
app.listen(process.env.port || 3000, () => {
    console.log('Server is listening for requests');
});
