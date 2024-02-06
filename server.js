const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");
const { mondoDbConnection } = require("./utlis.js");
//enabling environment variables
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());

//getting DATABASE environment variable
// const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

//connecting to DataBase
mondoDbConnection();

//every path stat with /api
app.use("/api", routes);

//which port it would run on localhost
const PORT = process.env.PORT || 3000;

//creating the localhost and port we will listen to
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
