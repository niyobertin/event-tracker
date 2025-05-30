import { EventModel } from "../database/models/eventModel";

export const updateEventStatuses = async () => {
  const now = new Date();
  await EventModel.updateMany(
    {
      started: false,
      dateTime: { $lte: now },
    },
    { $set: { started: true } }
  );

  await EventModel.updateMany(
    {
      ended: false,
      endingTime: { $lte: now },
    },
    { $set: { ended: true } }
  );

  await EventModel.updateMany(
    {
      started: false,
      ended: false,
      dateTime: { $lte: now },
      endingTime: { $lte: now },
    },
    { $set: { started: true, ended: true } }
  );
};
