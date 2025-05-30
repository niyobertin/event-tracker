"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Event-Tracker API",
            version: "1.0.0",
            description: "API documentation for Event-tracker",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        servers: [
            {
                url: "http://localhost:80/api/v1",
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/routes/*.js"],
};
