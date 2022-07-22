const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  //id: Number,
  name: {
    type: String,
    required: "Series title is required",
    trim: true,
  },
  image: {
    type: String,
    default:
      "https://us.123rf.com/450wm/avectors/avectors1808/avectors180800182/111902588-sin-tarjeta-de-prueba-de-color-de-tv-de-se%C3%B1al-de-patr%C3%B3n-de-barras-vectoriales.jpg?ver=6",
    validate: {
      validator: function (image) {
        try {
          new URL(image);
          return true;
        } catch (error) {
          return false;
        }
      },
      message: (image) => "Invalid URL",
    },
  },
  description: String,
  network: String,
  platform: {
    type: String,
    enum: [
      "Movistar+",
      "HBO Max",
      "Netflix",
      "Amazon Prime",
      "Disney+",
      "Apple TV",
      "Others",
    ],
  },
  status: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  episodes: [{
    season: Number,
    episode: Number,
    name: String
  }]
});

serieSchema.pre("validate", function (next) {
  this.image = this.image || undefined;
  this.description = this.description || undefined;
  next();
});

const Serie = mongoose.model("Serie", serieSchema);
module.exports = Serie;
