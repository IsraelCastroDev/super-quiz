import server from "./server";
import { scheduleCronJobs } from "./utils/cron-jobs";

const PORT = process.env.PORT || 3000;

scheduleCronJobs();

server.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
