import express from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protectRoute } from "./modules/auth";
import { createNewUser, signInUser } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

app.use("/api", protectRoute, router);

app.post("/create-user", createNewUser);
app.post("/sign-in", signInUser);

app.use(
  (
    err: Error & { type: string },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    if (err.type === "auth") {
      res.status(401).json({ error: "Unauthorized Access!" });
    } else if (err.type === "input") {
      res.status(400).json({ error: "Invalid Input!" });
    } else {
      res.status(500).json({ error: "Something's wrong with the server" });
    }
  }
);

export default app;
