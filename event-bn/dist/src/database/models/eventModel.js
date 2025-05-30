"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: false,
        default: "Online",
    },
    dateTime: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.EventModel = (0, mongoose_1.model)("Event", exports.eventSchema);
