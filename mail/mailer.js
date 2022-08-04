const transporter = require("../config/mail.config");

module.exports.sendWelcome = (user => {
    transporter.sendMail({
        from: "TV-Tracker<tvtrackerweb@gmail.com>",
        to: `${user.email}`,
        subject: `Welcome ${user.username}`,
        html: `<h1>Prueba</h1>
        <h3>Prueeeeeeeeeeeeba</h3>
        <img src="https://zachary-jones.com/zambombazo/wp-content/uploads/2020/09/miaucoles_probando_uno_dos_tres_720.jpg" alt="">`
    })
    .then(() => console.log("email sent!"))
    .catch(error => {
        console.log("error sending mail", error)
    })
})


