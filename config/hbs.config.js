const hbs = require("hbs");
// hbs.handlebars === require('handlebars');
const { User } = require("../models");

hbs.registerPartials(__dirname + "/../views/partials");

hbs.registerHelper("following", function(currentUser, serie, options) {
  //console.log(currentUser, serie)
  const matchSerieId = currentUser.matches
    .reduce((matches, serie) => {
      matches[serie.serieId] = (matches[serie.serieId] || [])
      matches[serie.serieId].push(serie)
      return matches
    }, {})
    const serieId = Object.keys(matchSerieId)
    //console.log(serieId)
    let result = false
   serieId.forEach(function (match) {
      // console.log(serie.id)
      // console.log(match)
      if (match === serie.id) {
        console.log("match")
        result = true
      } /* else {
        console.log("keep trying")
        result = false
      } */
     })
    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    } 
});
