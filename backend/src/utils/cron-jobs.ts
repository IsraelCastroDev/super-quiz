import cron from "node-cron";
import { prisma } from "../config/prisma";

async function deleteExpiredTokens() {
  await prisma.token.deleteMany({
    where: {
      expired_at: {
        lte: new Date(),
      },
    },
  });
}

function scheduleCronJobs() {
  cron.schedule("0 0 * * *", deleteExpiredTokens);
}

export { scheduleCronJobs };
