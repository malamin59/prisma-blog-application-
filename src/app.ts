import express, { Application } from "express";
import { postRouter } from "./modules/post/post.route";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:4000", // client site url
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("THE QUICK BROW FOX JUMPS OVER THE LAZY DOG");
});

export default app;
