import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
