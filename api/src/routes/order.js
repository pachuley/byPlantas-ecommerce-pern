const server = require("express").Router();
const { Order, User } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

server.put('/:id', (req,res,next) => {
    let {date, status, id} = req.body
    Order.update(
        {
            date,
            status
        },
        { returning: true, where: { id } }
    )
    .then((response) => {
        res.status(200).json(response);
      })
      .catch(next);
})


server.post('/:userId/cart', (req, res) => {

   Order.findOne({ 
           where: { 
               userId: req.params.idUser, 
               status: "cart" 
            } 
        })
        .then((r) => {
            r.addProduct({ 
                productId: req.body.productId,
                userId: req.params.idUser,
                quantity: req.body.quantity,
                price: req.body.price
             })
         })
     })

// S44 : Crear ruta que retorne todas las ordenes
// GET /orders
server.get('/', (req, res, next) => {
    // Crear ruta que retorne todas las ordenes
    Order.findAll()
    .then(result => {
        res.status(201).json(resutl)
    })
    .then(resultStatus => {
        // Esta ruta puede recibir el query string status y deberá 
        Order.findAll({ where: { status: req.query.status } })
        // devolver sólo las ordenes con ese status.
            .then(resultStatus => { res.status(201).json(orders)})
            .chat(error => res.send(201).json({message:"We couldn't find your request"}))
    })
    .catch(next)
})

  

module.exports = server
