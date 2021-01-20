const server = require('express').Router();
const { Category } = require('../db.js');
const Category = require('../models/Category.js');

server.get('/', (req, res, next) => {
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

module.exports = server;