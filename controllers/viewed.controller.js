const { Viewed } = require("../models");

module.exports.viewed = (req, res, next) => {
  const viewedCriteria = {
    userId: req.user.id,
    episodeId: req.params.episodeId,
  };
  Viewed.findOne(viewedCriteria)
    .then((match) => {
      if (!match) {
        Viewed.create(viewedCriteria)
          .then((match) => {
            res.redirect("back");
          })
          .catch(next);
      } else {
        match
          .delete()
          .then(() => {
            res.redirect("back");
          })
          .catch(next);
      }
    })
    .catch((error) => next(error));
};
