const server = require("express").Router();
const { User, Order, Product, Orderline } = require("../db.js");
const bcrypt = require('bcryptjs');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


// Routes
  // GET: /users
server.get('/', (req,res,next ) => {
    User.findAll()
        .then(users => {
                res.status(200).json(users)
            })
        .catch(next)
});
 
server.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json(`Por favor introduce tu ${!email ? "email" : 'password'}!`)
        }

        const saltHash = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, saltHash);
        
        await User.create({
            email: email, 
            encryptedPassword: encryptedPassword
        });

        await Order.create({
            status: "active"
        })
        console.log("cree la orden")
        res.status(201).json('Gracias por registrarse!');
    } catch(e) {
        /* if(e.parent.code === '23505') {
            res.status(409).json('Un usuario con ese email ya existe');
        } else {
            res.status(500).json('Algo está mal');
        } */
    }
});

server.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json(`Por favor introduce tu ${!email ? "email" : 'password'}!`)
        }

        const user = await User.findOne({
            where: {email: email}
        });

        if(user) {
            const validPassword = await bcrypt.compareSync(password, user.encryptedPassword);
            if(validPassword) {
                res.status(200).json('Email y contraseña correctos');
            } else {
                res.status(400).json('Contraseña equivocada!');
            }
        } else {
            res.status(404).json('Usuario no encontrado');
        }
    } catch(e) {
        console.log(e)
        res.status(500).json('Something broke!');
    }
});


server.put('/:id', async (req, res) => {
    try {
        const {email, password} = req.body;
        const salt = bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        
        await User.update({
            email: email, 
            encryptedPassword: encryptedPassword
        }, { returning: true, where: { id: req.params.id } 
    });  
        res.status(201).json('Usuario modificado');
    } catch(e) {
        if(e.parent.code === '23505') {
            res.status(409).json('Un usuario con ese email ya existe');
        } else {
            res.status(500).json('Algo está mal');
        }
    }
});


server.post('/:userId/cart', (req, res) => {
    Order.findOne({ 
           where: { 
               userId: req.params.userId, 
               status: "active"
            } 
        })

        .then((order) => {
            console.log(order)
            // Orderline.create({
                // price: req.body.price,
                // discount: req.body.discount,
                // quantity: req.body.quantity,
                // total: req.body.price * req.body.quantity,
                // userId: req.params.userId,
                // orderId: order.id,
                // productId: req.body.productId
            // })
            // .then(orderline => { 
            //     order.addOrderlines(orderline)
            //     .then((result) => res.json(order))
            // })
            .catch(error => {
                console.log(error);
             })
         })
     })

server.get('/:userId/cart', (req,res)=>{
    Order.findAll({
        attributes:['id','userId','status'],
        where:{
            [Op.and]: [
                { userId: req.params.userId },
                { status: 'active' }
              ]
        },
         include: [
            {
                model: Product
            },
        ]
    })
    .then(orders => {
        res.json(orders)
    })
    .catch(e => console.log(e))
})

module.exports = server;
