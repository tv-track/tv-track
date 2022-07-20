const Serie = require("../models/serie.model")

module.exports.list = (req, res, next) => {
    Serie.find()
        .then((series) => {
            res.render("index", { series })
        }) 
        .catch(error => next(error)) 
};

module.exports.newSerie = (req, res , next) => {
    res.render("series/new-serie")
}

/* module.exports.createSerie = (req, res, next) => {
    Serie.create()
} */