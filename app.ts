import express from "express";
const app = express();

import GameRouter from './routes/game'


app.use('/game', GameRouter)

export default app