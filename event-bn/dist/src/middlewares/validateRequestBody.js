"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBodyRequestData = void 0;
const validateBodyRequestData = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                message: "Validation error",
                details: error.details.map((detail) => detail.message),
            });
            return;
        }
        next();
    };
};
exports.validateBodyRequestData = validateBodyRequestData;
