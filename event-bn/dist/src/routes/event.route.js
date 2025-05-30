"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const validateRequestBody_1 = require("../middlewares/validateRequestBody");
const event_schema_1 = require("../schemas/event.schema");
const eventRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     description: Creates a new event in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event created successfully
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Bad request, validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Validation error
 *                 error:
 *                   type: string
 *                   example: "Title is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating the event
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 * */
/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - location
 *         - dateTime
 *       properties:
 *         title:
 *           type: string
 *           example: "Tech Conference"
 *         description:
 *           type: string
 *           example: "Annual tech conference covering latest trends."
 *         location:
 *           type: string
 *           example: "San Francisco, CA"
 *         dateTime:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 */
eventRoutes.post("/", (0, validateRequestBody_1.validateBodyRequestData)(event_schema_1.createEventSchema), event_controller_1.createEventController);
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     description: Retrieves a paginated list of all events.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events per page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Maximum number of events to return
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Events fetched successfully
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 totalEvents:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 */
eventRoutes.get("/", event_controller_1.getAllEventsController);
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     description: Retrieves the details of a single event using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the event to retrieve
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event fetched successfully
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching the event
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
eventRoutes.get("/:id", event_controller_1.getSingleEvent);
/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     description: Updates one or more fields of an event by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Event Title
 *               description:
 *                 type: string
 *                 example: Updated event description
 *               location:
 *                 type: string
 *                 example: New York, NY
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-30T14:00:00Z"
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event updated successfully
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       400:
 *         description: Invalid update request
 *       500:
 *         description: Internal server error
 */
eventRoutes.patch("/:id", event_controller_1.editEventDetails);
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     description: Removes an event from the system using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
eventRoutes.delete("/:id", event_controller_1.removeEvent);
exports.default = eventRoutes;
