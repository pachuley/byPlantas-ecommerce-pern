const server = require('express').Router();
const { Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.put('/category/:id', (req,res)=>{
    Category.update(
        {
            name: req.body.name,
            description: req.body.description
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(result => {
        res.status(201).send(result)
    })
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

server.delete('/:id', (req,res)=>{
	Category.destroy({where:{id:req.params.id}})
	.then(resp=>{
		if(resp === 0){
			return res.status(400).send('no se elimino nada')
		}else{
			res.send(`se elimino la categoria numero: ${req.params.id}`)
		}		
	})
})

module.exports = server;