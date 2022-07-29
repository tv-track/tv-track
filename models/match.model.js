const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const {User, Serie} = require("./index")

const matchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  serieId: {
    type: Schema.Types.ObjectId,
    ref: "Serie",
  },
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;

// matchSchema.virtuals("follow", {
//     ref: "Series",
//     localField: "_id",
//     foreignField: "User",
// })
