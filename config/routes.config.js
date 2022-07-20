const express = require("express");
const router = express.Router();
const series = require("")

router.get("/", series.list);

// router.get("/register", )

router.get("/new-serie", series.newSerie)

module.exports = router;
