const server = require("express").Router();
const { Order, User, Orderline, Product } = require("../db.js");
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

     
//vaciar carrito
server.put('/:userId/cart', (req, res) => {
    Order.findOne({ where: { userId: req.params.userId, status: "active" } })
        .then((orders) => {
            Orderline.update({
                price:"",
                quantity:"",
                discount:"",
                total:""
            }, {
             where:{id: orderId } 
            })
        
           .then(
            res.status(200).json({ message: "El carrito fue vaciado" })
                )
        })
        .catch(function (err) {
            res.status(400).json({ message: "No se pudo vaciar el carrito.", error: err })
        })
})

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
// GET /users/:id/orders
server.get('/:id/orders', (req, res, next) => {
    Order.findAll({where:{ id: req.params.id }})
        .then(orders => res.status(201).json(orders))
        .catch(error => res.send(400).json({message:"We couldn't find your request"}))
})  
//S46 : Crear Ruta que retorne una orden en particular.
//GET /orders/:id
 server.get('/:id', (req,res,next) => {
     Order.findByPk({ where: { id: req.params.id} })
        .then(result => { res.status(201).json(orders)})
        .catch(next)
 })


module.exports = server

