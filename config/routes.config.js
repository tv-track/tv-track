const express = require("express");
const router = express.Router();
const { series, auth, match, viewed } = require("../controllers");
const secure = require("../middlewares/secure.mid")
const isUser = secure.isAuthenticated
const isAdmin = secure.isAdmin

router.get("/", series.list);
router.get("/series/:id", isUser, series.detail);

router.get("/new-serie", isAdmin, series.newSerie);
router.post("/new-serie", isAdmin, series.createSerie);
router.get("/series/:serieId/new-episode", isAdmin, series.createEpisode);
router.post("/series/:serieId/new-episode", isAdmin, series.doCreateEpisode);
router.post("/series/:serieId/delete", isAdmin, series.delete)
router.get("/series/:serieId/edit", isAdmin, series.update)
router.post("/series/:serieId/edit", isAdmin, series.doUpdate)
router.post("/episodes/:episodeId/delete", isAdmin, series.doDeleteEpisode)
router.post("/series/search", isUser, series.search)
router.post("/series/search-genre", series.searchByGenre)


router.get("/register", auth.register);
router.post("/register", auth.doRegister);
router.get("/login", auth.login);
router.post("/login", auth.doLogin);

router.get("/logout", auth.doLogout)
router.get("/users/:id", isUser, auth.profile)
router.get("/users/:id/edit-user", isUser, auth.editUser)
router.post("/users/:id/edit-user", isUser, auth.doEditUser)

router.post("/series/:serieId/follow", isUser, match.follow)
router.post("/episodes/:episodeId/viewed", isUser, viewed.viewed)

module.exports = router;
