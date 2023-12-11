import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import ejs from "ejs";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import foodRoutes from "./routes/food.js";
import petRoutes from "./routes/pets.js";
import appointmentRoutes from "./routes/appointment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());

////
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));
/////

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/auth", authRoutes);
app.use("/post", dataRoutes);
app.use("/pets", petRoutes);
app.use("/food", foodRoutes);
app.use("/appointment", appointmentRoutes);
app.get("/", async (req, res) => {
  console.log("Home request");
  res.render("index.ejs");
});
app.get("/upload", async (req, res) => {
  res.render("upload.ejs");
});
app.post("/upload");
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Started Successfully on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
