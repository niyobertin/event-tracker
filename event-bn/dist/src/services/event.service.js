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
exports.deleteEvent = exports.updateEvent = exports.getEventByID = exports.getAllEvents = exports.createEvent = void 0;
const eventModel_1 = require("../database/models/eventModel");
const createEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const eventDateTime = new Date(event.dateTime);
    if (eventDateTime < new Date()) {
        throw new Error("Event date and time must be in the future");
    }
    const existingEvent = yield eventModel_1.EventModel.findOne({
        title: event.title,
        dateTime: event.dateTime,
    });
    if (existingEvent) {
        throw new Error("An event with the same title and date already exists");
    }
    const newEvent = yield eventModel_1.EventModel.create(event);
    return newEvent;
});
exports.createEvent = createEvent;
const getAllEvents = (page, size, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * size;
    const events = yield eventModel_1.EventModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ dateTime: 1 });
    const totalEvents = yield eventModel_1.EventModel.countDocuments();
    return {
        events,
        totalEvents,
        totalPages: Math.ceil(totalEvents / size),
        currentPage: page,
    };
});
exports.getAllEvents = getAllEvents;
const getEventByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield eventModel_1.EventModel.findById({ _id: id });
    if (!event) {
        throw new Error("Event not found");
    }
    return event;
});
exports.getEventByID = getEventByID;
const updateEvent = (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
    if (updatedFields.dateTime && new Date(updatedFields.dateTime) < new Date()) {
        throw new Error("Event date and time must be in the future");
    }
    const updatedEvent = yield eventModel_1.EventModel.findByIdAndUpdate(id, { $set: updatedFields }, { new: true, runValidators: true });
    if (!updatedEvent) {
        throw new Error("Event not found");
    }
    return updatedEvent;
});
exports.updateEvent = updateEvent;
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield eventModel_1.EventModel.findById({ _id: id });
    if (!event) {
        throw new Error("Event not found");
    }
    const deletedEvent = yield eventModel_1.EventModel.deleteOne({ _id: id });
    return deletedEvent;
});
exports.deleteEvent = deleteEvent;
