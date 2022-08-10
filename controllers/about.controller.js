module.exports.aboutUs = (req, res, next) => {
  res.render("about/us");
};

module.exports.aboutIvan = (req, res, next) => {
  res.render("about/ivan");
};

module.exports.aboutAdrian = (req, res, next) => {
  res.render("about/adrian");
};

module.exports.error = (req, res, next) => {
  res.redirect("/")
}