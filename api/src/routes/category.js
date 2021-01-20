const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});


server.post('/', (req, res, next) => {
   const {name, description} = req.body;

    Category.create({
	   name:name,
	   description:description
   })
     .then((data) =>{
		 res.status(200).send('category was added successfully')
	 })
	 .catch((err) => {
		 console.log(err);
	 });
});



module.exports = server;