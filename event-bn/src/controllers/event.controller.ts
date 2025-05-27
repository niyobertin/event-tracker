import { Request, Response } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventByID,
  updateEvent,
} from "../services/event.service";
import { IEvent } from "../../types";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const event: IEvent = req.body;
    const eventCreated = await createEvent(event);
    res.status(201).json({
      message: "Event created successfully",
      event: eventCreated,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Event date and time must be in the future")
    ) {
      res.status(400).json({
        message: "Validation error",
        error: error.message,
      });
      return;
    } else if (
      error instanceof Error &&
      error.message.includes(
        "An event with the same title and date already exists"
      )
    ) {
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
};

export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const limit = parseInt(req.query.limit as string) || 100;

    const eventsData = await getAllEvents(page, size, limit);
    res.status(200).json({
      message: "Events fetched successfully",
      events: eventsData.events,
      totalEvents: eventsData.totalEvents,
      totalPages: eventsData.totalPages,
      currentPage: eventsData.currentPage,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching events",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSingleEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await getEventByID(id);
    res.status(200).json({
      message: "Event fetched successful",
      data: event,
    });
  } catch (error) {
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
};

export const editEventDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedEvent = await updateEvent(id, updateData);
    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
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
};

export const removeEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteEvent(id);
    res.status(200).json({
      message: "Event deleted successful",
    });
  } catch (error) {
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
};
