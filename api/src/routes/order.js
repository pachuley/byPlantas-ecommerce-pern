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
                price: req.body.price,
                total: (req.body.quantity * req.body.price)
             })
             .then(Orderline => res.status(201).json({message: "Item was added to Order"}))
             .catch(error => {
                 res.status(400).json({message: "Internal error"})
             })
        })
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




module.exports = server;