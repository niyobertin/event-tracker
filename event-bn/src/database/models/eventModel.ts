import { Schema, model } from "mongoose";
import { IEvent } from "../../../types";

export const eventSchema = new Schema<IEvent>(
  {
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
    endingTime: {
      type: Date,
      required: true,
    },
    started: {
      type: Boolean,
      default: false,
    },
    ended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const EventModel = model<IEvent>("Event", eventSchema);
