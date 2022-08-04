const nodemailer = require("nodemailer")
const GMAIL_PASS = process.env.GMAIL_PASS

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tvtrackerweb@gmail.com",
        pass: GMAIL_PASS,
    }
})

module.exports = transporter;