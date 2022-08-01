const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  name: {
    type: String,
    required: "Episode title is required",
  },
  serie: {
    type: Schema.Types.ObjectId,
    ref: "Serie",
    required: "Serie is required"
  },
  season: {
    type: Number,
    min: 0,
    required: "Season number is required"
  },
  episode: {
    type: Number,
    min: 0,
    required: "Episode number is required"
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
});

episodeSchema.virtual("viewed", {
  ref: "User",
  localField: "_id",
  foreignField: "episode"
})

episodeSchema.pre("validate", function (next) {
  this.image = this.image || undefined;
  this.description = this.description || undefined;
  next();
});

const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;
