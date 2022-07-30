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

// module.exports.follow = (req, res, next) => {
//     Match.findOne({ serieId: req.params.serieId, userId: req.user.id  })
//       .then((match) => {
//           if (!match) {
//               const match = new Match({
//                   serieId: req.params.serieId,
//                   userId: req.user.id,
//               })
//               match.save()
//                   .then(matches => res.redirect('back'))
//           } else {
//               return Match.findByIdAndDelete(match.id)
//                       .then(() => res.redirect('back'))

//           }
//       })
//       .catch(error => next(error))
//   };
