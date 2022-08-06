const mongoose = require("mongoose");
const { User } = require("../models");
const { session } = require("../config/session.config");
const mailer = require("../mail/mailer")

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
          mailer.sendWelcome(user)
          res.redirect("/login");
        });
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
            res.redirect("/");
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
        path: "serieId",
      },
    })
    .then((user) => {
      res.render("user/profile-page", { user });
    })
    .catch((error) => next(error));
};

module.exports.editUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.render("user/edit-profile", { user });
    })
    .catch((error) => next(error));
};

module.exports.doEditUser = (req, res, next) => {
  const userData = ({ username, email, bio, password } = req.body);
  Object.assign(req.user, userData);

  req.user
    .save()
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((error) => next(error));
};
