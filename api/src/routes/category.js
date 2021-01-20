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

server.delete('/:name', (req,res)=>{
	Category.destroy({where:{name:req.params.name}})
	.then(resp=>{
		if(resp === 0){
			return res.status(400).send('no se elimino nada')
		}else{
			res.send(`se elimino la categoria llamada: ${req.params.name}`)
		}		
	})
})

module.exports = server;