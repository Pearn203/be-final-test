import express from "express";
import mongoose from "mongoose";
import userRoutes from "./src/router/userRouter.js";
import imageRoutes from "./src/router/imageRoutes.js";
import teacherRoutes from "./src/router/teacherRouter.js";
import teacherPositionRoutes from "./src/router/teacherPositionRouter.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api", imageRoutes);
app.use("/api", userRoutes);
app.use("/api", teacherRoutes);
app.use("/api", teacherPositionRoutes);

mongoose
  .connect(
    "mongodb+srv://finaltest:p9luIgbvFo4J26zz@finaltest.6ggjt.mongodb.net/befinaltest",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
