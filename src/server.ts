import express from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protectRoute } from "./modules/auth";

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

export default app;
