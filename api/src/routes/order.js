const server = require("express").Router();
const { Order, User, Orderline } = require("../db.js");
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

/*  server.post('/', (req, res) => {
     console.log(req.body)
     Order.create({
        userId: req.body.userId
     })
     .then(order => {
        Orderline.create({
            price: req.body.price,
            quantity: req.body.quantity,
            discount: req.body.discount,
            total: req.body.total,
            userId: order.userId,
            orderId: order.id,
            productId: 1
        })
        .then(orderline => {
            console.log(orderline)
            order.setOrderlines(orderline)
               .then(result => {
                   console.log(result, 'aca')
                   res.json(order)
               })
        })
         res.json(order)
     })
     .catch(e => console.log(e))
 }) */

module.exports = server

