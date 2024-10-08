import cron from "node-cron";
import Token from "../models/Token";

async function deleteExpiredTokens() {
  await Token.deleteMany({
    expired_at: {
      lte: new Date(),
    },
  });
}

function scheduleCronJobs() {
  cron.schedule("0 0 * * *", deleteExpiredTokens);
}

export { scheduleCronJobs };
