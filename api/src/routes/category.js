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
})

module.exports = server;