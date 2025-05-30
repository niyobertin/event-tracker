import cron from "node-cron";
import { updateEventStatuses } from "../eventStatus";

export const startEventStatusJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log("Checking event statuses...");
      const response = await updateEventStatuses();
      console.log(response); //debugging purpose
    } catch (err) {
      console.error("Error updating event statuses:", err);
    }
  });
};
