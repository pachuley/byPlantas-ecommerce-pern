const server = require("express").Router();
const { User } = require("../db.js");
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// Routes
server.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json(`Por favor introduce tu ${!email ? "email" : 'password'}!`)
        }
        console.log(password)
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log(encryptedPassword)
        await User.create({
            email: email, 
            encryptedPassword: encryptedPassword
        });
    
        res.status(200).json('Gracias por registrarse!');
    } catch(e) {
        console.log(e.parent.code)
        if(e.parent.code === '23505') {
            res.status(400).json('Un usuario con ese email ya existe');
        } else {
            res.status(400).json('Algo está mal');
        }
    }
});


module.exports = server;