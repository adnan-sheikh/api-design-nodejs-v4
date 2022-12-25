import express from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhhSecret = "a super secret";
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

app.use("/api", router);

export default app;
