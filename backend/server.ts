import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Spotify API Route
const spotifyRoute = require("./routes/api/spotify");
app.use("/api/spotify", spotifyRoute);

app.get("/", (req, res) => {
  res.json({ message: "hey, welcome" });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
