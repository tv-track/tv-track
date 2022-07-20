const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost/tv-tracker")
    .then(() => console.info("Connected do DB"))
    .catch(() => console.error("Error DB", error))