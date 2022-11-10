import express from "express";
const router = express.Router();
import { create, getAll, getSpecific } from "../controllers/game-controller";

router.get("/", getAll);
router.post("/", create);

router.get("/:id", getSpecific);

export default router;
