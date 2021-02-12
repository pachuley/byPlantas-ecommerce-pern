const server = require("express").Router();
const { Order, User, Orderline, Product } = require("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { verifyToken, verifyRoleAdmin } = require("../middlewares/authHandler");

server.get("/", [verifyToken, verifyRoleAdmin], (req, res, next) => {
  Order.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((orders) => {
      res.status(200).json(orders)
    })
    .catch((err) => {
      return res.status(400).json({ data: err })
    });
});

server.post("/:userId/order", [verifyToken, verifyRoleAdmin], (req, res) => {
  User.findByPk(req.params.userId).then((resp) => {
    resp.addOrder({}, { through: { selfGranted: true } });
    res.json({
      status: "succes",
      estado: resp,
    });
  });
});

server.put("/:id", [verifyToken], async (req, res, next) => {
  let { status } = req.body;
  let id = req.params.id;
  Order.update(
    {
      status,
    },
    { returning: true, where: { id } }
  )
    .then((response) => {
      res.status(200).json(response[1]);
    })
    .catch(next);
});

server.post("/:userId/cart", async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: req.body.productId } });
    let order = await Order.findOne({
      where: { userId: req.params.userId, status: "active" },
    });

    let orderline = await Orderline.findOne({ where: { orderId: order.id } });

    await orderline.update({
      price: req.body.price,
      quantity: req.body.quantity,
      discount: req.body.discount,
      total: req.body.total,
    });

    /*         console.log(orderline)
        console.log(Object.keys(orderline.__proto__))
        console.log(Object.keys(order.__proto__))
        console.log(Object.keys(product.__proto__)) */
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
  }
});

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
server.get("/:id/orders",(req, res, next) => {
  Order.findOne({
    where: { id: parseInt(req.params.id) },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((order) => res.status(201).json(order))
    .catch((error) =>
      res.send(400).json({ ok: false, error })
    );
});
//S46 : Crear Ruta que retorne una orden en particular.
//GET /orders/:id
server.get("/:id", (req, res, next) => {
  Order.findByPk({ where: { id: req.params.id } })
    .then((orders) => {
      res.status(201).json(orders);
    })
    .catch(next);
});
//S44

server.get("/orders", [verifyToken, verifyRoleAdmin], (req, res, next) => {
  Order.findAll()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch(next);
});

module.exports = server;
