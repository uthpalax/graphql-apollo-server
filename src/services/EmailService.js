const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const jwt = require('jsonwebtoken')

const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);

const sendConfirmationEmail = async (user) => {
    const token = await jwt.sign({
        _id: user._id
    }, process.env.JWT_SECRET_KEY)

    const url = `http://localhost:3000/confirmation/${token}` 

    transport.sendMail({
        from: 'no-reply@doingiteasychannel.com',
        to: `${user.name} <${user.email}>`,
        subject: 'Confirmation Email',
        html: `Confirmation Email <a href=${url}> ${url}</a>`
    }).then( () => {
        console.log("Email sent")
    }).catch(() => {
        console.log("Emails was not sent")
    })
}

exports.sendConfirmationEmail = sendConfirmationEmail