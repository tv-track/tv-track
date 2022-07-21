const express = require("express");
const router = express.Router();
const series = require("../controllers/series.controller")

router.get("/", series.list);
router.get("/serie/:id", series.seasons);

// router.get("/register", )

router.get("/new-serie", series.newSerie)
router.post("/new-serie", series.createSerie)
router.get("/serie/:id/new-season", series.createSeason)
router.post("/serie/:id/new-season", series.doCreateSeason)


module.exports = router;
