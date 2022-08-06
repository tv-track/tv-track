const { Match } = require("../models");

module.exports.follow = (req, res, next) => {
  const followCriteria = { userId: req.user.id, serieId: req.params.serieId };
  Match.findOne(followCriteria)
    .then((match) => {
      if (!match) {
        Match.create(followCriteria)
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
