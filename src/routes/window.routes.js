import { Router } from "express";
import {createWindowData, getWindowData, updateWindowData} from "../controllers/window.controller.js";

const router = Router()

router.post("/window", createWindowData);
router.put("/window", updateWindowData);
router.get("/window", getWindowData);

export default router;