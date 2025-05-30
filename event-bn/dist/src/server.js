"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = require("./utils/swaggerConfig");
const index_1 = __importDefault(require("./routes/index"));
const mongo_1 = require("./config/mongo");
dotenv_1.default.config();
(0, mongo_1.dbConnection)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 80;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const spec = (0, swagger_jsdoc_1.default)(swaggerConfig_1.swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec, { explorer: true }));
app.use("/api/v1", index_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Welcome to the Event-tracker api!");
});
app.listen(PORT, () => {
    console.log(`Event-BN Server is running on http://localhost:${PORT}`);
    console.log(`API documentation is available at http://localhost:${PORT}/api-docs`);
});
