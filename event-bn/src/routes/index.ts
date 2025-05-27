import e, { Router, Request, Response } from "express";
import eventRoutes from "./event.route";

const appRoutes = Router();

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

appRoutes.get("/health-check", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Event-tracker API is running smoothly!",
    timestamp: new Date().toISOString(),
  });
});

appRoutes.use("/events", eventRoutes);
export default appRoutes;
