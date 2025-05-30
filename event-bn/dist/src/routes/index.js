"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_route_1 = __importDefault(require("./event.route"));
const appRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check the health of the API
 *     tags: [Health]
 *     description: Returns the status of the Event-tracker API.
 *     responses:
 *       200:
 *         description: API is running smoothly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Event-tracker API is running smoothly!
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-01T12:00:00Z"
 */
appRoutes.get("/health-check", (req, res) => {
    res.json({
        status: "ok",
        message: "Event-tracker API is running smoothly!",
        timestamp: new Date().toISOString(),
    });
});
appRoutes.use("/events", event_route_1.default);
exports.default = appRoutes;
