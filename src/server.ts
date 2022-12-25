import express from "express";
import path from "path";
import router from "./router";

const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

app.use("/api", router);

export default app;
