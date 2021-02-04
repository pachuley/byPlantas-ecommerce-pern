const server = require("express").Router();
const { User, Order, Product, Orderline } = require("../db.js");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const {
  verifyToken,
  verifyRoleAdmin,
  verifyRoleVendor,
} = require("../middlewares/authHandler");

// Routes
// GET: /users
server.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

server.post("/register", async (req, res) => {
  let { email, password, role } = req.body;
  const saltHash = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, saltHash);

  if (!email || !password) {
    res
      .status(400)
      .json(`Por favor introduce tu ${!email ? "email" : "password"}!`);
  }

  User.create({
    email,
    encryptedPassword,
    role,
  })
    .then((user) => {
      Order.create({
        userId: user.id,
      }).then((order) => {
        user.addOrder(order).then((result) => {
          res.json(user);
        });
      });
    })
    .catch((e) => {
      if (e.parent.code === "23505") {
        res.status(409).json("Un usuario con ese email ya existe");
      } else {
        res.status(500).json("Algo está mal");
      }
    });
});

server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json(`Por favor introduce tu ${!email ? "email" : "password"}!`);
    }

    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      const validPassword = await bcrypt.compareSync(
        password,
        user.encryptedPassword
      );
      if (validPassword) {
        const findOrder = await Order.findOrCreate({
          where: {
            id: user.id,
            status: "active",
          },
        });
        const token = jwt.sign({ user }, SECRET, { expiresIn: 10000000 });
        res.status(200).json({
          message: "Email y contraseña correctos",
          userId: user.id,
          token: token,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      } else {
        res.status(400).json("Contraseña equivocada!");
      }
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Something broke!");
  }
});

server.put("/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    await User.update(
      {
        email: email,
        encryptedPassword: encryptedPassword,
      },
      { returning: true, where: { id: req.params.id } }
    );
    res.status(201).json("Usuario modificado");
  } catch (e) {
    if (e.parent.code === "23505") {
      res.status(409).json("Un usuario con ese email ya existe");
    } else {
      res.status(500).json("Algo está mal");
    }
  }
});

// server.post('/:userId/cart/:prodId', (req,res)=>{
//     var prod;
//     Order.findOne({
//         where:{ [Op.and]: [
//             { userId: req.params.userId },
//             { status: 'active' }
//           ]}
//     })
//     .then(order=>{
//         Product.findByPk(parseInt(req.params.prodId))
//         .then(resp=>{
//             prod = resp
//             order.addProduct(prod)
//             res.json('todo bien')
//         })

//     })
// })

server.post("/:userId/cart", async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: req.body.productId } });
    let order = await Order.findOne({
      where: { userId: req.params.userId, status: "active" },
    });

    await order.addProduct(product);

    let orderline = await Orderline.findOne({
      where: {
        [Op.and]: [{ orderId: order.id }, { productId: product.id }],
      },
    });

    await orderline.update({
      price: req.body.price,
      quantity: orderline.quantity
        ? orderline.quantity + req.body.quantity
        : req.body.quantity,
      discount: req.body.discount,
      total: parseInt(req.body.quantity) * parseFloat(req.body.price),
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

//vaciar carrito
server.delete("/:userId/cart", (req, res) => {
  Order.findOne({ where: { userId: req.params.userId, status: "active" } })
    .then((orders) => {
      Orderline.destroy({
        where: { orderId: orderId },
      }).then(res.status(200).json({ message: "El carrito fue vaciado" }));
    })
    .catch(function (err) {
      res
        .status(400)
        .json({ message: "No se pudo vaciar el carrito.", error: err });
    });
});

server.delete("/:userId/cart/:productId", (req, res) => {
  var prod;
  Order.findOne({
    where: { userId: req.params.userId, status: "active" },
  }).then((order) => {
    Product.findByPk(req.params.productId).then((prod) => {
      order.removeProduct(prod);
      res.send("ok");
    });
  });
});

server.put("/:userId/cart/:productId", (req, res) => {
  Order.findOne({
    where: { [Op.and]: [{ userId: req.params.userId }, { status: "active" }] },
  }).then((order) => {
    Orderline.findOne({
      where: {
        [Op.and]: [{ orderId: order.id }, { productId: req.params.productId }],
      },
    }).then((orderline) => {
      console.log(req.body);
      orderline.update({ quantity: req.body.contador });
      res.send("ok");
    });
  });
});

server.put("/:userId/cart", (req, res) => {
  let order;
  Order.findOne({ where: { userId: req.params.userId, status: "active" } })
    .then((r) => {
      order = r.id;
    })
    .catch((error) => {
      console.log;
    });
  Orderline.update(
    { quantity: req.body.quantity },
    { where: { orderId: order, productId: req.body.productId } }
  )
    .then((r) => {
      res.status(201).json({ mesagge: "producto actualizado" });
    })
    .catch((err) => {
      console.log(err);
    });
});

server.get("/:userId/cart", (req, res) => {
  Order.findAll({
    attributes: ["id", "userId", "status"],
    where: {
      [Op.and]: [{ userId: req.params.userId }, { status: "active" }],
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((orders) => {
      res.json(orders);
    })
    .catch((e) => console.log(e));
});

module.exports = server;
