const mongoose = require("mongoose");
const { Serie, Episode, Viewed } = require("../models");

module.exports.list = (req, res, next) => {
  Serie.find()
    .then((series) => {
      const randomSeries = series.sort(function() {
        return Math.random() - 0.5
      })
      res.render("index", { randomSeries, series })})
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
  Serie.findById(req.params.id)
    .populate("episodes")
    .then((serie) => {
      if (serie) {
        const seasons = serie.episodes
          .sort((a, b) => a.season - b.season)
          .reduce((seasons, episode) => {            
            seasons[episode.season] = (seasons[episode.season] || [])
            seasons[episode.season].push(episode);
            seasons[episode.season].sort(
              (a, b) => a.episode - b.episode
            );
            return seasons;
          }, {});
        const seasonNum = Object.keys(seasons);

        return Viewed.findOne({
          episodeId: req.params.episodeId,
          userId: req.user.id
        })
          .then((viewed) => {
            res.render("series/series-detail", { serie, seasons, seasonNum, viewed })})
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
};

module.exports.createEpisode = (req, res, next) => {
  Serie.findById(req.params.serieId)
    .then((serie) => {
      if (serie) {
        res.render("series/new-episode", { serie });
      } else {
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
};

module.exports.doCreateEpisode = (req, res, next) => {
  const serieData = req.body;
  serieData.serie = req.params.serieId;

  function renderWithErrors(errors, serie) {
    console.log(serieData);
    res.status(400).render("series/new-episode", {
      serie: serieData,
      episode: req.body,
      serie,
      errors,
    });
  }

  Serie.findById(req.params.serieId).then((serie) => {
    if (!serie) {
      renderWithErrors({ serie: "This serie doesn't exist" }, serie);
    } else {
      return Episode.create(serieData)
        .then((episode) => {
          console.log("Episode created");
          res.redirect(`/series/${req.params.serieId}`);
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            renderWithErrors(error.errors, serie);
          } else {
            next(error);
          }
        });
    }
  });
};

module.exports.delete = (req, res, next) => {
  Serie.findById(req.params.serieId)
    .then((serie) => {
      return Episode.deleteMany({ serie: serie.id }).then(() => {
        return Serie.findByIdAndDelete(req.params.serieId).then(() => {
          res.redirect("/");
        });
      });
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  Serie.findById(req.params.serieId)
    .then((serie) => {
      res.render("series/serie-edit", { serie });
    })
    .catch((error) => next(error));
};

module.exports.doUpdate = (req, res, next) => {
  const { name, image, description, network, platform, status, rating, genre } =
    req.body;
  Serie.findByIdAndUpdate(
    req.params.serieId,
    { name, image, description, network, platform, status, rating, genre },
    { new: true }
  )
    .then((serie) => res.redirect(`/series/${serie.id}`))
    .catch((error) => next(error));
};

module.exports.doDeleteEpisode = (req, res, next) => {
  Episode.findByIdAndDelete(req.params.episodeId)
    .then(() => res.redirect("back"))
    .catch((error) => next(error));
};

module.exports.search = (req, res, next) => {
  const search = req.body
  Serie.findOne(search)
    .then((serie) => {
      if (serie){
      res.redirect(`/series/${serie.id}`)
      } else {
        res.redirect("/")
      }
    })
    .catch(error => next(error))
}

module.exports.searchByGenre = (req, res, next) => {
  const genre = req.body.genre
  console.log(genre)
  Serie.find({genre: {$in: [genre]}})
    .then((series) => {
      console.log(series)
      res.render("series/founded", { series })
    })
    .catch(error => next(error))
}

/* module.exports.founded = (req, res, next) => {
  res.render("series/founded")
} */