const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	
	Product.findAll()
	
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

// server.post('/add', (req, res) =>{

// 	const addProduct = req.body;
// 	Product.create({
// 		id:addProduct.id,
// 		nameProduct: addProduct.nameProduct,
// 		descriptionProduct: addProduct.descriptionProduct,
// 		priceProduct: addProduct.priceProduct,
// 		stockProducts: addProduct.stockProducts,
// 		urlProducts: addProduct.urlProduct,
// 		createdAt:addProduct.createdAt,
// 		updatedAt:addProduct.updatedAt
// 	})
// 	.then(response=>res.send(response));
// })
server.get('/delete/:id',(req,res)=>{
	let id = req.params.id;
	Product.destroy({
		where:{id:id}
	}).then(function(result){
		if(result){
			res.redirect(200,'/products');
		}else{
			res.send('El registro no concuerda con ninguno dentro de la tabla products');
		}
	})
})
server.get('/:id',(req,res)=>{
	let id = req.params.id;
	Product.findAll({
		where:{id:id}
	}).then(function(result){
		if(result){
			res.send(result);
		}else{
			res.send('El registro no concuerda con ninguno dentro de la tabla products');
		}
	})
})
server.post('/add', (req, res) =>{

	const addProduct = req.body;
	Product.create({
		id:addProduct.id,
		nameProduct: addProduct.nameProduct,
		descriptionProduct: addProduct.descriptionProduct,
		priceProduct: addProduct.priceProduct,
		stockProducts: addProduct.stockProducts,
		urlProducts: addProduct.urlProduct,
		createdAt:addProduct.createdAt,
		updatedAt:addProduct.updatedAt
	})
	.then(response=>res.send(response));
})


module.exports = server;

