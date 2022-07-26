const express = require("express");
const router = express.Router();
const { series, auth } = require("../controllers");
const secure = require("../middlewares/secure.mid")
const isUser = secure.isAuthenticated
const isAdmin = secure.isAdmin

router.get("/", series.list);
router.get("/serie/:id", isUser, series.detail);

router.get("/new-serie", isAdmin, series.newSerie);
router.post("/new-serie", isAdmin, series.createSerie);
router.get("/serie/:serieId/new-episode", isAdmin, series.createEpisode);
router.post("/serie/:serieId/new-episode", isAdmin, series.doCreateEpisode);

router.get("/register", auth.register);
router.post("/register", auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);

module.exports = router;
