import { Router } from "express";
import {
  findAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventoController";

const router = Router();

router.get("/", findAllEvents);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
