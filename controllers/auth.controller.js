const mongoose = require("mongoose");
const { User, Match } = require("../models");
const { session } = require("../config/session.config");
let transporter = require("../mail/index")

module.exports.register = (req, res, next) => {
  res.render("auth/register");
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.status(400).render("auth/register", {
      user: req.body,
      errors,
    });
  }

  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        renderWithErrors({
          username: "User name already exists",
        });
      } else {
        const user = req.body;
        return User.create(user).then((user) => {
          transporter.sendMail({
            from: "TV-Tracker<tvtrackerweb@gmail.com>",
            to: `${user.email}`,
            subject: `Welcome ${user.username}` ,
            html: `<h1>Prueba</h1>
            <h3>Prueeeeeeeeeeeeba</h3>
            <img src="https://zachary-jones.com/zambombazo/wp-content/uploads/2020/09/miaucoles_probando_uno_dos_tres_720.jpg" alt="">`
        })
            .then(() => console.log("email sent!"))
            .catch(error => {
                console.log("error sending mail", error)
            })
          res.redirect("/login")
        })
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

module.exports.doLogin = (req, res, next) => {
  function renderInvalidLogin() {
    res.status(400).render("auth/login", {
      user: req.body,
      errors: { password: "Invalid user name or password" },
    });
  }

  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        renderInvalidLogin();
      } else {
        return user.checkPassword(password).then((match) => {
          if (match) {
            req.session.userId = user.id;
            next(res.redirect("/"));
          } else {
            renderInvalidLogin();
          }
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.doLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports.profile = (req, res, next) => {
  User.findById(req.user.id)
    .populate({
      path: "matches",
      populate: {
        path: 'serieId'
      }
    })
    .then((user) => {
      console.log(user.id)
      res.render("user/profile-page", { user });
    })
    .catch((error) => next(error));
};

module.exports.editUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render("user/edit-profile", { user })
    })
    .catch(error => next(error))  
}

module.exports.doEditUser = (req, res, next) => {
  const userData = { username, email, bio, password} = req.body;
  Object.assign(req.user, userData)

  req.user.save()
    .then((user) => {
      res.redirect(`/users/${user.id}`)
    })
    .catch(error => next(error))
}
