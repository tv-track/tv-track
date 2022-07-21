const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  title: {
    type: String,
    required: "Chapter title is required",
  },
  duration: {
    type: Number,
    required: true,
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
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  following: {
    type: String,
    enum: ["yes", "no"],
  },
});

serieSchema.pre("validate", function (next) {
  this.image = this.image || undefined;
  this.description = this.description || undefined;
  next();
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
