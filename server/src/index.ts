import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("GET / HITTED");
  res.send("Hello World!!!!!");
});

app.listen(PORT, () => {
  console.log(`Running on localhost:${PORT}`);
});
