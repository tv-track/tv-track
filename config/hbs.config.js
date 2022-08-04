const hbs = require("hbs");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("following", function(currentUser, serie, options) {
    if (currentUser.matches.some((match) => match.serieId == serie.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    } 
});

hbs.registerHelper("viewed", function(currentUser, episode, options) {
  if (currentUser.viewed.some((viewed) => viewed.episodeId == episode.id)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})