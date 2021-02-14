const server = require("express").Router();
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { SENDGRID_API, EMAIL_PRUEBA } = process.env;


const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

server.post('/send', (req,res)=>{
    const {name, email, message, subject} = req.body
    transporter.sendMail({
        to: email,
        from: EMAIL_PRUEBA,
        subject: subject,
        html: `<h3>Hola ${name}, como estas?</h3>
        <p>${message}</p>`,
    }).then(resp => {
        res.json({resp,message: `Email enviado a ${email}`})
    }).catch(err=>{
        res.status(400).json(err)
    })
})

module.exports = server;