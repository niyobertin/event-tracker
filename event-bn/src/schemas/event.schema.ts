import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required",
  }),
  location: Joi.string().optional(),
  dateTime: Joi.date().required().messages({
    "date.base": "Date and time must be a valid date",
    "any.required": "Date and time is required",
  }),
  endingTime: Joi.date().required().messages({
    "date.base": "Date and time must be a valid date",
    "any.required": "Date and time is required",
  }),
});

const updateEventSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  dateTime: Joi.date().optional().messages({
    "date.base": "Date and time must be a valid date",
  }),
});
