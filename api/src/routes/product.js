const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	
	Product.findAll()
	
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/add', (req, res) =>{

	const addProduct = req.body;
	
	

	return Product.create({

		nameProduct: addProduct.nameProduct,
		descriptionProduct: addProduct.descriptionProduct,
		priceProduct: addProduct.priceProduct,
		stockProduct: addProduct.stockProduct,
		urlProduct: addProduct.urlProduct,

		

	})

	.then(response=>{
		console.log(response)
		res.render("hola")
	})
	

})

module.exports = server;

