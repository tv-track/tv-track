const { Viewed } = require("../models");

module.exports.viewed = (req, res, next) => {
  const viewedCriteria = {
    userId: req.user.id,
    episodeId: req.params.episodeId,
  };
  Viewed.findOne(viewedCriteria)
    .then((match) => {
      console.log("hey")
      if (!match) {
        return Viewed.create(viewedCriteria)
          .then((match) => res.redirect("back"))
      } else {
        return match
          .delete()
          .then(() => res.redirect("back"))
      }
    })
    .catch((error) => next(error));
};
