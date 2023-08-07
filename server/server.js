const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const cors = require("./middleware/cors/cors");
const morganLogger = require("./middleware/loggers/morganLogger");

const config = require("config");
const {
  generateInitialPosts,
  generateInitialUsers,
} = require("./initialData/initialDataService");

app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(express.static("./public"));

const PORT = config.get("PORT") || 9000;
app.listen(PORT, async () => {
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
  require("./DB/mongodb/connectToMongoDB");
  await generateInitialPosts();
  await generateInitialUsers();
});
