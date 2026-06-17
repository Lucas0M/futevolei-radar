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

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Lista todos os eventos com paginação e filtros
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página (padrão 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Itens por página (padrão 10)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [AGENDADO, EM_ANDAMENTO, FINALIZADO, CANCELADO]
 *         description: Filtrar por status
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar por cidade
 *     responses:
 *       200:
 *         description: Lista de eventos com metadados de paginação
 */
router.get("/", findAllEvents);
/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Busca evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get("/:id", findEventById);
/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - torneio
 *               - dataInicio
 *             properties:
 *               torneio:
 *                 type: string
 *                 example: Circuito Brasileiro
 *               dataInicio:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-10"
 *               cidade:
 *                 type: string
 *                 example: Curitiba
 *               status:
 *                 type: string
 *                 enum: [AGENDADO, EM_ANDAMENTO, FINALIZADO, CANCELADO]
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", validate(createEventoSchema), createEvent);
/**
 * @swagger
 * /eventos/{id}:
 *   patch:
 *     summary: Atualiza um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               torneio:
 *                 type: string
 *                 example: Circuito Brasileiro
 *               dataInicio:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-10"
 *               cidade:
 *                 type: string
 *                 example: Curitiba
 *               status:
 *                 type: string
 *                 enum: [AGENDADO, EM_ANDAMENTO, FINALIZADO, CANCELADO]
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.patch("/:id", validate(updateEventoSchema), updateEvent);
/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Deleta um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Evento deletado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.delete("/:id", deleteEvent);

export default router;
