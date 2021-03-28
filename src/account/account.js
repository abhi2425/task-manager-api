require('dotenv').config()
const nodemailer = require('nodemailer')

const sendEmail = async (email, message) => {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: process.env.USER_MAIL,
         pass: process.env.PASS,
      },
   })

   const mailOptions = {
      from: 'abhiinvirtuallife@gmail.com',
      to: email,
      subject: 'Thanks For Joining In',
      text: message,
   }

   await transporter.sendMail(mailOptions).catch((error) => console.log(error))
}
module.exports = sendEmail
