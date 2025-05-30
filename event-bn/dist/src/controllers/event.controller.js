"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEvent = exports.editEventDetails = exports.getSingleEvent = exports.getAllEventsController = exports.createEventController = void 0;
const event_service_1 = require("../services/event.service");
const createEventController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = req.body;
        const eventCreated = yield (0, event_service_1.createEvent)(event);
        res.status(201).json({
            message: "Event created successfully",
            event: eventCreated,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message.includes("Event date and time must be in the future")) {
            res.status(400).json({
                message: "Validation error",
                error: error.message,
            });
            return;
        }
        else if (error instanceof Error &&
            error.message.includes("An event with the same title and date already exists")) {
            res.status(400).json({
                message: "Validation error",
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "An error occurred while creating the event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createEventController = createEventController;
const getAllEventsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const limit = parseInt(req.query.limit) || 100;
        const eventsData = yield (0, event_service_1.getAllEvents)(page, size, limit);
        res.status(200).json({
            message: "Events fetched successfully",
            events: eventsData.events,
            totalEvents: eventsData.totalEvents,
            totalPages: eventsData.totalPages,
            currentPage: eventsData.currentPage,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching events",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getAllEventsController = getAllEventsController;
const getSingleEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const event = yield (0, event_service_1.getEventByID)(id);
        res.status(200).json({
            message: "Event fetched successful",
            data: event,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("Event not found")) {
            res.status(404).json({
                message: "Validation error",
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "An error occurred while fetching event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getSingleEvent = getSingleEvent;
const editEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedEvent = yield (0, event_service_1.updateEvent)(id, updateData);
        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent,
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("Event not found")) {
            res.status(404).json({
                message: "Validation error",
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "An error occurred while updating event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.editEventDetails = editEventDetails;
const removeEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, event_service_1.deleteEvent)(id);
        res.status(200).json({
            message: "Event deleted successful",
        });
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("Event not found")) {
            res.status(404).json({
                message: "Validation error",
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            message: "An error occurred while deleting event",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.removeEvent = removeEvent;
