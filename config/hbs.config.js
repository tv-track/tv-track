const hbs = require("hbs");
hbs.handlebars === require('handlebars');
const { User } = require("../models");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("following", function (serie, options) {
  if (serie) {
    options.fn(this);
  } else {
    options.inverse(this);
  }
});
