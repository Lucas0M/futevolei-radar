import { Router } from "express";
import { findAllEvents, createEvent } from "../controllers/eventoController";

const router = Router();

router.get("/", findAllEvents);
router.post("/", createEvent);

export default router;
