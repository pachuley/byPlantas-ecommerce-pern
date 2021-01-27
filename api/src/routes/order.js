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

module.exports = server