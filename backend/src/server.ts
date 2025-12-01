import dotenv from "dotenv";
dotenv.config();
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoute from "./routes/userRoute"


const app = express()
const port = 3001

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/user", userRoute)

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
