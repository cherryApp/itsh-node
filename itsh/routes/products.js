var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Product = mongoose.model('Product', {
  name: String,
  price: Number,
  manufacturer: String,
  active: Boolean
});

var phone = new Product({
  name: 'Nokia 3310',
  manufacturer: 'Nokia',
  price: 18000,
  active: true 
});

phone.save( (err, data, docs) => {
  if (err) {
    return console.error(err);
  } 
  console.log(`save product: ${docs} pcs`);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('products', {title: 'Products Page'});
});

module.exports = router;
