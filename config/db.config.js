const mongoose = require("mongoose")

mongoose
    .connect("mongodb://localhost/tv-tracker")
    .then(() => console.info("Connected do DB"))
    .catch(() => console.error("Error DB", error))


// DB Iván: "mongodb+srv://Ivan:VM6ivYYS6r6ekGD@cluster0.ybodnrm.mongodb.net/test"
// DB Adrián: "mongodb://localhost/tv-tracker"