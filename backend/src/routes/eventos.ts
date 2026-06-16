import { Router } from "express";
import {
  findAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  findEventById,
} from "../controllers/eventoController";

const router = Router();

router.get("/", findAllEvents);
router.get("/:id", findEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
