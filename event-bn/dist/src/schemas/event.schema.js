"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createEventSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
        "any.required": "Title is required",
    }),
    description: joi_1.default.string().required().messages({
        "string.base": "Description must be a string",
        "string.empty": "Description cannot be empty",
        "any.required": "Description is required",
    }),
    location: joi_1.default.string().optional(),
    dateTime: joi_1.default.date().required().messages({
        "date.base": "Date and time must be a valid date",
        "any.required": "Date and time is required",
    }),
});
const updateEventSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    location: joi_1.default.string().optional(),
    dateTime: joi_1.default.date().optional().messages({
        "date.base": "Date and time must be a valid date",
    }),
});
