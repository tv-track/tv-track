const express = require("express");
const router = express.Router();
const series = require("../controllers/series.controller")

router.get("/", series.list);

// router.get("/register", )

router.get("/new-serie", series.newSerie)
router.post("/new-serie", series.createSerie)

module.exports = router;
