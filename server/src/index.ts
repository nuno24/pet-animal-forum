import "dotenv/config";
import app from "./app"
import { prisma } from "./lib/prisma"

const PORT = 3000;

prisma.$connect()
  .then(() => console.log("Connected to DB"))
  .catch((err:any) => console.error("DB connection failed:", err))

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
