const mongoose = require("mongoose")
const Serie = require("../models/serie.model")

// module.exports.list = (req, res, next) => {
//     Serie.find()
//         .then((series) => {
//             res.render("index", { series })
//         }) 
//         .catch(error => next(error)) 
// };

module.exports.list = (req, res, next) => {
    Serie.find()
        .then((series) => res.render("index", { series }))
        .catch((error) => next(error))
    
}

module.exports.newSerie = (req, res , next) => {
    res.render("series/new-serie")
}
module.exports.createSerie = (req, res, next) => {
    const serie = req.body;
    Serie.create(serie)
        .then((serie) => {
            console.log("Created")
            res.redirect("/")
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                console.error(error)
                res.render("series/new-serie", {errors: error.errors, serie})
            } else {
                next(error)
            }
        })
}