const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tv-tracker"

mongoose
    .connect(MONGODB_URI)
    .then(() => console.info("Connected to DB"))
    .catch(() => console.error("Error DB", error))


