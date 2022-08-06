const transporter = require("../config/mail.config");
module.exports.sendWelcome = (user) => {
  transporter
    .sendMail({
      from: "TV-Tracker<tvtrackerweb@gmail.com>",
      to: `${user.email}`,
      subject: `Welcome ${user.username}`,
      html: `<h1>Welcome to TV-Tracker</h1>
        <h3>This is the home of 'series lovers'</h3>
        <br>
        <p>Dear ${user.username}, TV-Tracker Team says hi! <br>
        This is the place where you could track all episodes of your favorite TV shows. We want to be useful for your binge-watching days or nights.<br>
        Thank you for your registration at the website. You can writes wherever you want for additional info or to report any bug on this wonderful place for TV lovers.<br>
        You can talk with TV-Tracker Team sending an email to tvtrackerweb@gmail.com. We would be happy to help you. <br>
        <br>
        <img src="https://i.ibb.co/hgKX36C/Tv-trackers.png" alt="Tv-Trackers" border="0">
        <br>
        <br>
        Happy watching!
        <br>
        TV-Tracker Team
        </p>`
    ,
    })
    .then(() => console.log("email sent!"))
    .catch((error) => {
      console.log("error sending mail", error);
    });
};