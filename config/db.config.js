const mongoose = require("mongoose")

mongoose
    .connect("mongodb+srv://Ivan:VM6ivYYS6r6ekGD@cluster0.ybodnrm.mongodb.net/test")
    .then(() => console.info("Connected do DB"))
    .catch(() => console.error("Error DB", error))