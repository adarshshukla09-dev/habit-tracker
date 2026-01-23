import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import habit from "./routes/habit.routes.js";
import todos from "./routes/dailyTodos.routes.js";
import user from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://habit-tracker-liart-alpha.vercel.app",
    credentials: true,
  }),
);
// Routes
app.use("/api/habit", habit);
app.use("/api/todos", todos);
app.use("/api/auth", user);
// app.use("/api/user", user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
