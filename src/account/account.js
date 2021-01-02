require("dotenv").config()
const nodemailer = require("nodemailer")

const sendEmail = (email, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS
        }
    });

    const mailOptions = {
        from: 'abhiinvirtuallife@gmail.com',
        to: email,
        subject: "Thanks For Joining In",
        text: message
    };

    transporter.sendMail(mailOptions)
}
module.exports = sendEmail