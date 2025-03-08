require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import connection from "./config/connectDB.js";

const app = express();

//confic CORS
configCors(app);

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

//test connection
// connection();

//initWebRoutes
initWebRoutes(app);
initApiRoutes(app);

const PORT = 8080;

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
