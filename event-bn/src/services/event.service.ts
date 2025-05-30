import { EventModel } from "../database/models/eventModel";
import { IEvent } from "../../types";

export const createEvent = async (event: IEvent): Promise<IEvent> => {
  // Convert input strings to Date objects
  const eventDateTime = new Date(event.dateTime.toString());
  const eventEndingTime = new Date(event.endingTime.toString());

  const now = new Date();

  if (eventDateTime <= now) {
    throw new Error("Event start date and time must be in the future");
  }
  if (eventEndingTime <= now) {
    throw new Error("Event end date and time must be in the future");
  }
  if (eventEndingTime <= eventDateTime) {
    throw new Error("Event end time must be after start time");
  }

  // Check if event with same title and exact start date exists
  const existingEvent = await EventModel.findOne({
    title: event.title,
    dateTime: eventDateTime,
  });

  if (existingEvent) {
    throw new Error("An event with the same title and date already exists");
  }

  // Create event storing Date objects, NOT strings
  const newEvent = await EventModel.create({
    ...event,
    dateTime: eventDateTime.toISOString(),
    endingTime: eventEndingTime.toISOString(),
  });

  return newEvent;
};

export const getAllEvents = async (
  page: number,
  size: number,
  limit: number
) => {
  const skip = (page - 1) * size;
  const events = await EventModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ dateTime: 1 });
  const totalEvents = await EventModel.countDocuments();
  return {
    events,
    totalEvents,
    totalPages: Math.ceil(totalEvents / size),
    currentPage: page,
  };
};

export const getEventByID = async (id: string) => {
  const event = await EventModel.findById({ _id: id });
  if (!event) {
    throw new Error("Event not found");
  }
  return event;
};

export const updateEvent = async (
  id: string,
  updatedFields: Partial<IEvent>
): Promise<IEvent | null> => {
  if (
    updatedFields.dateTime &&
    new Date(updatedFields.dateTime.toString()) < new Date()
  ) {
    throw new Error("Event date and time must be in the future");
  }

  const updatedEvent = await EventModel.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!updatedEvent) {
    throw new Error("Event not found");
  }

  return updatedEvent;
};

export const deleteEvent = async (id: string) => {
  const event = await EventModel.findById({ _id: id });
  if (!event) {
    throw new Error("Event not found");
  }
  const deletedEvent = await EventModel.deleteOne({ _id: id });
  return deletedEvent;
};
