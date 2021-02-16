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

let sendEmail = (name='', email='',message='',subject='') =>{
    transporter.sendMail({
        to: email,
        from: EMAIL_PRUEBA,
        subject: subject,
        html: `<h3>Hola ${name}, como estas?</h3>
        <p>${message}</p>`,
    }).then(resp => {
        return resp
    }).catch(err=>{
        return err
    })
}

module.exports = {
    sendEmail
}