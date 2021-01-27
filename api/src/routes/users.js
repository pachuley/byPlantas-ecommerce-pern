
const server = require("express").Router();
const { User } = require("../db.js");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

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
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email: email, 
            encryptedPassword: encryptedPassword
        });   
        res.status(201).json('Gracias por registrarse!');
    } catch(e) {
        if(e.parent.code === '23505') {
            res.status(409).json('Un usuario con ese email ya existe');
        } else {
            res.status(500).json('Algo está mal');
        }
    }
});

server.put('/:id', async (req, res) => {
    try {
        const {email, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
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

module.exports = server;