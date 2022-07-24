const mongoose = require("mongoose");
const { Serie, Episode } = require("../models");

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

module.exports.detail = (req, res, next) => {
  //  const { serieId } = req.params.id;

  Serie.findById(req.params.id)
    .populate("episodes")
    .then((serie) => {
      if (serie) {
        res.render("series/series-detail", { serie })
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
};

module.exports.createEpisode = (req, res, next) => {
  Serie.findById(req.params.serieId)
    .then((serie) => {
      res.render("series/new-episode", { serie } );
    })
    .catch(error => next(error))
};

// a comprobar desde aquí
module.exports.doCreateEpisode = (req, res, next) => {
  function renderWithErrors(error) {
    res.render("series/new-episode", {
      serie: req.params.serieId,
      errors
    })
  }

  Serie.findById(req.params.serieId)
    .then((serie) => {
      const serieData = req.body
      serieData.serie = req.params.serieId
      if (!serie) {
        renderWithErrors({ serie:"This serie doesn't exist" })
      } else {
        return Episode.create(serieData)
        .then((episode) => {
          console.log("Episode created");
          res.redirect(`/serie/${req.params.serieId}`);
        })
      }      
    })
    .catch(error => {
      if(error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error)
      }
    })



  /* const season = {
    ...req.body,
    serie: req.serie.id,
  };

  Season.create(season)
    .then((season) => {
      console.log("Season created");
      res.redirect("/");
    })
    .catch((error) => next(error)); */
};
