import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import { mongoDbConnection } from "./utlis.js";
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//connecting to DataBase
mongoDbConnection();

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
