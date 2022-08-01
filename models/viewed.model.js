const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  episodeId: {
    type: Schema.Types.ObjectId,
    ref: "Episode",
  },
});

const Viewed = mongoose.model("Viewed", viewedSchema);
module.exports = Viewed;
