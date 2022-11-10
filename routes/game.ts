import express from "express";
const router = express.Router();
import { create, getAll } from "../controllers/game-controller";

router.get("/", getAll);
router.post("/", create);

export default router;
