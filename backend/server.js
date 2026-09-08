



// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { db } from "./db/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";

import deliveryTripRoutes from "./routes/deliveryTripRoutes.js";

import writeOffRoutes from "./routes/writeOffRoutes.js";

// Error handling
import { notFound, errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();



// ✅ CORS configuration for Netlify + local dev
const allowedOrigins = [
  "https://ubiquitous-bublanina-92e994.netlify.app",
  "http://localhost:3000",
];




app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // ✅ important for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);





const port = process.env.PORT || 5000;






// ✅ Connect to DB
db()
  .then(() => console.log("🟢 Database connected"))
  .catch((err) => {
    console.error("🔴 DB connection error:", err);
    process.exit(1);
  });

// ✅ Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));





import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// Prevent caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});





// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

app.use("/api/delivery", deliveryTripRoutes);

app.use("/api/writeoff", writeOffRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("WELCOME MISA 🙌 Backend is running!");
});

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
