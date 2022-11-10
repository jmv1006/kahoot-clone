import express from "express";
import cors from "cors";
import GameRouter from "./routes/game";

const app = express();

const allowedOrigins = ["*"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use("/game", GameRouter);

export default app;
