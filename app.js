const express = require("express");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`));

const routes = require("./config/routes.config");
app.use("/", routes);

const port = 3000;
app.listen(port, () => console.log(`Application listening at port ${port}`));
