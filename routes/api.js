const express = require('express'),
    router = express.Router(),
    Ninja = require('../models/ninjas');

// get a list of ninjas from the db
router.get('/ninjas', (req, res, next) => {
    // Ninja.geoNear (
    //     {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000, spherical: true}
    // )
    //     .then((ninjas) => {
    //         res.send(ninjas);
    //     })
    
    Ninja.find()
        .then((ninjas) => {
            res.send(ninjas);
        })
});

// add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body)
        .then((ninja) => {
            res.send({ninja});
        })
        .catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Ninja.findOne({ _id: req.params.id })
                .then((ninja) => {
                    res.send(ninja);
                });
        });
});

// delete a ninja from db
router.delete('/ninjas/:id', (req, res, next) => {
    Ninja.findByIdAndRemove({ _id: req.params.id })
        .then((ninja) => {
            res.send(ninja);
        });
});

module.exports = router;