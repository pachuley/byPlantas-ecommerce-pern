const server = require('express')
const Sequelize = require('sequelize');
const {users} = require('../db')
const {response } = require('../app.js');


// --- Rutas GET --- 

server.get('/', (req,res,next ) => {
    Users.findAll()
        .then(users => {
                res.status(200).json(users)
            })
        .catch(next)
});


module.exports = server;