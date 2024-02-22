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
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";
import foodRoutes from "./routes/food.js";
import petRoutes from "./routes/pets.js";
import appointmentRoutes from "./routes/appointment.js";
import accessoryRoutes from "./routes/accessory.js";
import Count from "./models/Count.js";
import adminRoutes from "./routes/admin.js";
import { verifyToken } from "./middleware/authverfication.js";
// import Count from "./models/Count.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));

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

// app.use(async (req, res, next) => {
//   const ip = req.ip || req.connect.remoteAddress;

//   let visit = await Visit.findOne({ ip });

//   if (!visit) {
//     // If the user is visiting for the first time, create a new visit record
//     visit = new Visit({ ip });
//   }

//   // Increment the visit count
//   visit.count += 1;

//   // Save the updated visit record
//   await visit.save();

//   next();
// });

app.use("/auth", authRoutes);
app.use("/post", dataRoutes);
app.use("/pets", petRoutes);
app.use("/food", foodRoutes);
app.use("/accessory", accessoryRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/profile/admin", verifyToken, adminRoutes);
app.get("/", async (req, res) => {
  console.log("Home request");

  res.render("index.ejs");
});

app.get("/updatecount", async (req, res) => {
  const count = await Count.findOne({ countId: "100" });
  console.log(count);
  const views = count.countViews + 1;
  console.log(views);
  await Count.findOneAndUpdate({ countId: "100" }, { countViews: views });
  res.json({ views });
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
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server Started Successfully on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDZlOTJkNDhmYTY2YmQxZWFlNWY0YiIsImlhdCI6MTcwODU4MzI5N30.ajzXZpBIiqDsdqpPKLt3QMffJn4lu2HxSwa0YV-inRw