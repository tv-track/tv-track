const express = require("express");
const router = express.Router();
const { series, auth} = require("../controllers")

router.get("/", series.list);
router.get("/serie/:id", series.detail);

router.get("/new-serie", series.newSerie)
router.post("/new-serie", series.createSerie)
router.get("/serie/:serieId/new-episode", series.createEpisode)
router.post("/serie/:serieId/new-episode", series.doCreateEpisode)

router.get("/register", auth.register);

router.get("/login", auth.login);


module.exports = router;
