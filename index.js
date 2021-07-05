import express from "express";
import cors from "cors";
import gameRoutes from "./routes/game.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/game/", gameRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.use(errorHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`listening on the port ${port}`);
});
