require("dotenv").config();
const mongoose = require("mongoose");

require("../config/db.config");
const series = require("../data/series");
const { Serie } = require("../models");
const deleteSeries = true;

mongoose.connection.once("open", () => {
  const deleteSeriesPromise = deleteSeries
    ? Serie.collection.drop().then(() => console.log("Series collection deleted"))
    : Promise.resolve();

  deleteSeriesPromise
    .then(() => Serie.create(series))
    .then((series) => console.log(`${series.length} series created!`))
    .catch((error) => console.error(error))
    .then(() => mongoose.connection.close());
});
