const expressSession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { User } = require("../models");

const session = expressSession({
  secret: process.env.SESSION_SECRET || "super secret",
  resave: false,
  saveUninitialized: false,
  name: "sessionCookie",
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 24 * 3600,
  }),
  cookie: {
    secure: process.env.SESSION_SECURE === "true",
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});

const loadUser = (req, res, next) => {
  const { userId } = req.session;
  User.findById(userId)
    .populate("matches")
    .then((user) => {
      req.user = user;
      res.locals.currentUser = user;
      next();
    })
    .catch((error) => next(error));
};

module.exports = { session, loadUser };
