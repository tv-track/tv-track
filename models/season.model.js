const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
  serie: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Serie",
  },
  title: {
    type: String,
    required: "Season name is required",
  },
});

const Season = mongoose.model("Season", seasonSchema);

module.exports = Season;
