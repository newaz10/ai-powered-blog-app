import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Lazily connect to DB on the first incoming request so it doesn't crash initialization
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database connection failed:", err);
    res.status(500).send("Database connection error");
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("api is working fine");
});

app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// ONLY listen locally. Vercel doesn't use app.listen in production.
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("server is running on PORT " + PORT);
  });
}

export default app;
