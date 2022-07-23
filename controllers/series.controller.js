const mongoose = require("mongoose");
const { Serie, Season } = require("../models");

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
    .catch((error) => next(error));
};

module.exports.newSerie = (req, res, next) => {
  res.render("series/new-serie");
};
module.exports.createSerie = (req, res, next) => {
  const serie = req.body;
  Serie.create(serie)
    .then((serie) => {
      console.log("Created");
      res.redirect("/");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(error);
        res.render("series/new-serie", { errors: error.errors, serie });
      } else {
        next(error);
      }
    });
};

module.exports.seasons = (req, res, next) => {
  //  const { serieId } = req.params.id;

  Serie.findById(req.params.id)
    .then((serie) => {
     /*  if (serie) {
        return Season.find()
        .then((seasons) => */
          res.render("series/series-detail", { /* seasons, */ serie })
        /* );
      } else {
        return res.redirect("/");
      } */
    })
    .catch((error) => next(error));
};

module.exports.createEpisode = (req, res, next) => {
  
  res.render("series/new-season");
};

module.exports.doCreateEpisode = (req, res, next) => {
  const season = {
    ...req.body,
    serie: req.serie.id,
  };

  Season.create(season)
    .then((season) => {
      console.log("Season created");
      res.redirect("/");
    })
    .catch((error) => next(error));
};
