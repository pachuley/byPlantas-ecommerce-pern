const server = require('express').Router();
const { Product } = require('../db.js');

server.use('/category', require('./category.js'))
server.get('/', (req, res, next) => {
	
	Product.findAll()
	
		.then(products => {
			res.send(products);

		})
		.catch(next);
});

server.post('/', (req, res) =>{
	const addProduct = req.body;
	Product.create({
		nameProduct: addProduct.nameProduct,
		descriptionProduct: addProduct.descriptionProduct,
		priceProduct: addProduct.priceProduct,
		stockProduct: addProduct.stockProduct,
		urlProduct: addProduct.urlProduct,
	})
	.then(response=>res.status(201).send(response));
})

server.delete('/:id',(req,res)=>{
	let id = req.params.id;
	Product.destroy({
		where:{id:id}
	}).then((result)=>{
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

server.put('/:id', function (req, res, next) {

	let {nameProduct, descriptionProduct, priceProduct, stockProduct, urlProduct} = req.body
	Product.update(
	  { nameProduct: nameProduct,
		descriptionProduct: descriptionProduct,
		priceProduct: priceProduct,
		stockProduct: stockProduct,
		urlProduct: urlProduct,
	},
	  {returning: true, where: {id: req.params.id} }
	)
	.then((response) => {
	  res.json(response)
	})
	.catch(next)
   })

module.exports = server;

