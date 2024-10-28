import server from "./server";
import { scheduleCronJobs } from "./utils/cron-jobs";

const PORT = process.env.PORT || 3000;

scheduleCronJobs();

server.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

server.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
