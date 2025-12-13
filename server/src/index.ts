import "dotenv/config";
import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma"

const app = express();
const PORT = 3000;

prisma.$connect()
  .then(() => console.log("Connected to DB"))
  .catch((err:any) => console.error("DB connection failed:", err))

app.get("/", (req: Request, res: Response) => {
  console.log("GET / HITTED");
  res.send("Hello World!!!!!");
});

app.listen(PORT, () => {
  console.log(`Running on localhost1:${PORT}`);
});
