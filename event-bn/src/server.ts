import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./utils/swaggerConfig";
import appRoutes from "./routes/index";
import { dbConnection } from "./config/mongo";
dotenv.config();
dbConnection();

const app = express();
const PORT = process.env.PORT || 80;
app.use(express.json());
app.use(cors());

const spec = swaggerJSDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(spec, { explorer: true })
);
app.use("/api/v1", appRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to the Event-tracker api!");
});

app.listen(PORT, () => {
  console.log(`Event-BN Server is running on http://localhost:${PORT}`);
  console.log(
    `API documentation is available at http://localhost:${PORT}/api-docs`
  );
});
