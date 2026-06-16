import { Router } from "express";
import {
  findAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  findEventById,
} from "../controllers/eventoController";
import { validate } from "../middleware/validate";
import {
  createEventoSchema,
  updateEventoSchema,
} from "../schemas/eventoSchema";

const router = Router();

router.get("/", findAllEvents);
router.get("/:id", findEventById);
router.post("/", validate(createEventoSchema), createEvent);
router.patch("/:id", validate(updateEventoSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
