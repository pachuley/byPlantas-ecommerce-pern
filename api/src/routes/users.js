const server = require("express").Router();
const { User, Order, Product, Orderline } = require("../db.js");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;
const { verifyToken, verifyRoleAdmin } = require("../middlewares/authHandler");

// Routes
// GET: /users
server.get("/", verifyToken, verifyRoleAdmin, (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

server.put('/ban', (req,res)=>{
  var {userId, userStatus} = req.body
  if(userStatus){
    User.update({status: false}, {
      where: {
        id: userId
      }
    })
    .then(resp=>{
      res.json(resp)
    })
  }else{
    User.update({status: true}, {
      where: {
        id: userId
      }
    })
    .then(resp=>{
      res.json(resp)
    })
  }
})

//post promote convierte el user a admin
server.post("/auth/promote/:id", [verifyToken], async (req, res) => {
  let idUser = req.params.id;
  const user = await User.findByPk(idUser);
  if (!user) {
    res.status(400).json({
      ok: false,
    });
  }
  user.role = "ADMIN_ROLE";
  await user.save();
  res.status(200).json({
    ok: true,
    message: "Se cambio el role a ADMIN",
    user,
    userCreator: req.user,
  });
});

// POST: Crear Usuario
server.post("/register", async (req, res) => {
  let { email, password, birthdate, firstname, lastname, address } = req.body;
  const saltHash = await bcrypt.genSalt(10);
  const encryptedpassword = await bcrypt.hash(password, saltHash);

  if (!email || !password) {
    res
      .status(400)
      .json(`Por favor introduce tu ${!email ? "email" : "password"}!`);
  }

  User.create({
    email,
    encryptedpassword,
    firstname,
    lastname,
    address,
    birthdate,
    role: "CLIENT_ROLE",
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

//POST: Login usuario
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
        user.encryptedpassword
      );
      if (validPassword && user.status) {
        const findOrder = await Order.findOrCreate({
          where: {
            userId: user.id,
            status: "active",
          },
        });
        const token = jwt.sign({ user }, SECRET, { expiresIn: 3600 });
        res.status(200).json({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          email: user.email,
          birthdate: user.birthdate,
          address: user.address,
          token,
        });
      } else {
        !validPassword ?
        res.status(400).json({message:"Contraseña equivocada!"})
        :res.status(401).json({message:"Usuario deshabilitado!"});
      }
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Something broke!");
  }
});

server.post("/login/:email", async (req, res) => {
  let googleEmail = req.params.email
  try {

    const user = await User.findOne({
      where: { email: googleEmail },
    });
    if (user) {
      const findOrder = await Order.findOrCreate({
        where: {
          userId: user.id,
          status: "active",
        },
      });
      const token = jwt.sign({ user }, SECRET, { expiresIn: 3600 });
      res.status(200).json({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        email: user.email,
        birthdate: user.birthdate,
        address: user.address,
        token
      });
    } else {
      res.status(404).json("Usuario no encontrado");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Something broke!");
  }
}); 

server.put("/:id", verifyToken, async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSalt(10);
    const encryptedpassword = await bcrypt.hash(password, salt);

    await User.update(
      {
        email: email,
        encryptedPassword: encryptedpassword,
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
server.put('/:userId/changepassword', verifyToken, verifyRoleAdmin, async (req,res)=>{
  const {password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedpassword = await bcrypt.hash(password, salt);

  User.update(
    {encryptedpassword: encryptedpassword},
    { returning: true, where: { id: req.params.userId } 
  })
  .then(resp=>{
    res.json('ok');
  })
  .catch(err=>{
    res.status(400).json('error')
  })  
})
server.post("/:userId/cart", verifyToken, async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: parseInt(req.body.productId) } });
    let order = await Order.findOne({
      where: { userId: parseInt(req.params.userId) },
    });

    await order.addProduct(product);
    let orderline = await Orderline.findOne({
      where: {
        [Op.and]: [{ orderId: order.id }, { productId: product.id }],
      },
    });

    orderline.price = parseFloat(product.price)
    orderline.quantity = orderline.quantity + parseInt(req.body.quantity)
    orderline.discount = parseFloat(req.body.discount)
    orderline.total = orderline.quantity ? orderline.quantity * parseFloat(product.price) : parseInt(req.body.quantity) * parseFloat(product.price)

    //TODO: controlar stock
/*     if((product.stock - orderline.quantity) > 0){
      product.stock = product.stock - parseInt(req.body.quantity) */
/*       await product.save() */
      await orderline.save()
      res.status(201).json({
        orderId: orderline.orderId,
        productId: product.id,
        productPrice: orderline.price,
        quantity: orderline.quantity,
        total: orderline.total,
        productName: product.name,
        imgs: product.imgs,
        productDescription: product.description,
        stockProduct: product.stock
  
      });
/*     }else{
      return res.status(400).json({
        ok: false,
        message: 'No se agrego orderline'
      })
    } */
  } catch (error) {
    res.status(400).json({
      ok: false,
      error
    })
  }
});

//vaciar carrito
server.delete("/:userId/cart", async(req, res) => {

  let order = await Order.findOne({ where: { userId: req.params.userId, status: "active" } })
  if(order){
    console.log(Object.keys(order.__proto__))
    order.removeProducts()
      .then(resp => {
        return res.status(200).json({
          ok:true,
          message: `Se eliminaron productos de la orden: ${order.id}`,
          data: resp
        })
      })
      .catch(err => {
        res.status(400).json({
          ok: false,
          message: err
        })
      })
  }
  /* res.json('error') */
  /* Order.findOne({ where: { userId: req.params.userId, status: "active" } })
    .then((order) => {
      Orderline.destroy({
        where: { orderId: orderId },
      }).then(res.status(200).json({ message: "El carrito fue vaciado" }));
    })
    .catch(function (err) {
      
      res
        .status(400)
        .json({ message: "No se pudo vaciar el carrito.", error: err });
    }); */
});

server.delete("/:userId/cart/:productId", verifyToken, (req, res) => {
  var prod;
  Order.findOne({
    where: { userId: req.params.userId},
  }).then((order) => {
    Product.findByPk(req.params.productId).then((prod) => {
      order.removeProducts(prod).then(resp => {
        res.status(200).json({
          ok:true,
          id: req.params.productId,
          data: resp,
          message: `Se elimino producto id: ${req.params.productId}`
        });
      })
      .catch(err => {
        res.status(402).json({
          ok:false,
          err
        })
      })
    });
  });
});

server.put("/:userId/cart/:productId", verifyToken, (req, res) => {
  Order.findOne({
    where: { [Op.and]: [{ userId: req.params.userId }, { status: "active" }] },
  }).then((order) => {
    Orderline.findOne({
      where: {
        [Op.and]: [{ orderId: order.id }, { productId: req.params.productId }],
      },
    }).then((orderline) => {
      orderline.update({ quantity: req.body.contador });
      res.send("ok");
    });
  });
});

server.put("/:userId/cart", verifyToken, (req, res) => {
  let order;
  Order.findOne({ where: { userId: req.params.userId, status: "active" } })
    .then((r) => {
      order = r.id;
    })
    .catch((error) => {
      console.log(error);
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

server.get("/:userId/cart", verifyToken, (req, res) => {
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

server.get("/:userId/orderlines", async(req, res) => {
  
  try{
    let order = await Order.findOne({
      where: { userId: parseInt(req.params.userId)},
    });
    let orderlines = await order.getProducts()
     
    let arrAux = []
    orderlines.forEach(element => {
      arrAux.push({
        orderId: element.orderline.orderId,
        productId: element.orderline.productId,
        productPrice: parseFloat(element.orderline.price),
        quantity: element.orderline.quantity,
        total: parseFloat(element.orderline.total),
        productName: element.name,
        imgs: element.imgs,
        productDescription: element.description,
        stockProduct: element.stock,
      })
    });
    res.json(arrAux)
  }catch{
    res.status(400).json({
      ok: false,
    })
  }
});

server.get('/removes', async(req,res)=>{
  try {
    const users = await Order.findAll({
      paranoid: false
    });
    res.status(200).json(users)
    
  } catch (error) {
    res.status(400).json(error)
  }
})

server.delete("/:id", (req, res) => {
    User.destroy({
      where: { id: req.params.id }
    }).then(user => {
        res.json(user)
    }).catch(err => {
      res.status(400).json(err)
    })
})

module.exports = server;
