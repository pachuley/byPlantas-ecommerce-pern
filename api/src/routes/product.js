const server = require('express').Router();
const { Product } = require('../db.js');

server.use('/category', require('./category.js'))

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(categories => {
			res.send(categories);
		})
		.catch(next);
});

module.exports = server;
