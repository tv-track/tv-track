const { Match } = require("../models");

module.exports.follow = (req, res, next) => {
  const followCriteria = { user: req.user.id, serie: req.params.serieId };
  Match.findOne(followCriteria)
    .then((match) => {
        if (!match) {
            Match.create(followCriteria)
                .then(console.log(`match: ${match} created`))
                .catch(next)
        } else {
            match.delete()
                .then(console.log(`match: ${match} deleted`))
                .catch(next)
        }
    })
    .catch(error => next(error))
};
