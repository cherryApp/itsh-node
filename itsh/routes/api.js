var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Models.
const models = {};
models.scheme = {};
models.product = mongoose.model('Product', {
    name: String,
    price: Number,
    manufacturer: String,
    active: Boolean
});

models.scheme.user = {
    name: String,
    email: String,
    phone: String,
    address: String,
    active: Boolean
};
models.user = mongoose.model('User', models.scheme.user);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('invalid request');
});

router.get('/:collection', function(req, res, next) {
    let collection = req.params.collection;
    if (models[collection]) {
        models[collection].find((err, data) => {
            if (err) {
                res.writeHead(501, 'Database Error.');
                return res.send();
            }
            res.json({
                docs: data,
                scheme: models.scheme[collection]
            });
        });
    } else {
        res.writeHead(404, 'No Colleciton!');
        return res.send();
    }
});

// Update document.
router.post('/:collection/:id', (req, res, next) => {
    let collection = req.params.collection;
    let id = req.params.id;

    if (models[collection]) {
        models[collection].update({ _id: id },
            req.body, {},
            (err, data) => {
                if (err) {
                    return res.json(err);
                }
                res.json(data);
            });
    } else {
        res.writeHead(404, 'No Colleciton!');
        return res.send();
    }
});

// Delete document.
router.delete('/:collection/:id', (req, res, next) => {
    let collection = req.params.collection;
    let id = req.params.id;

    if (models[collection]) {
        models[collection].remove({ _id: id },
            (err, data) => {
                if (err) {
                    return res.json(err);
                }
                res.json(data);
            });
    } else {
        res.writeHead(404, 'No Colleciton!');
        return res.send();
    }
});

// Create document.
router.put('/:collection', (req, res, next) => {
    let collection = req.params.collection;

    if (models[collection]) {
        let entity = new models[collection](req.body);
        entity.save((err, data) => {
            if (err) {
                return res.json(err);
            }
            res.json(data);
        });
    } else {
        res.writeHead(404, 'No Colleciton!');
        return res.send();
    }
});

module.exports = router;