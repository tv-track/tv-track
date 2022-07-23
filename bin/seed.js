require("dotenv").config();
const mongoose = require("mongoose");

require("../config/db.config");
const seriesData = require("../data/series");
const { Serie, Episode } = require("../models");
const deleteSeries = true;

mongoose.connection.once("open", () => {
  const deleteSeriesPromise = deleteSeries
    ? Serie.collection.drop().then(() => console.log("Series collection deleted"))
    : Promise.resolve();

  deleteSeriesPromise
    .then(() => Serie.create(seriesData))
    .then((series) => {
      console.log(`${series.length} series created!`)
      const episodes = series.flatMap((serie) => {
        const { episodes } = seriesData.find((s) => s.name === serie.name)
        return episodes.map((episode) => {
          episode.serie = serie.id
          episode.name = episode.name || `Episode: ${episode.number}`
          return episode
        })
      })
      return Episode.create(episodes)
    })
    .then((episodes) => console.log(`${episodes.length} episodes created!`))
    .catch((error) => console.error(error))
    .then(() => mongoose.connection.close());
});
