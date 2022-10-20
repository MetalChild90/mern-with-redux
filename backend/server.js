import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import colors from "colors";
import "dotenv/config.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
const PORT = process.env.PORT || 8000;
import { connectDB } from "./config/db.js";

connectDB();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Very welcome" });
});

//Routes
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Slucham na porcie ${PORT}`));
