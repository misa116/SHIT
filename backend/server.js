/*/import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// DB connection
db();

// Security headers and cookie parsing
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging for dev
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Prevent caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// ✅ FIXED: CORS CONFIG
const allowedOrigins = [
  'https://ubiquitous-bublanina-92e994.netlify.app', // your Netlify frontend
  'http://localhost:3000' // optional for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ required for cookies
  })
);

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//if (process.env.NODE_ENV === "production") {
  //app.use(express.static(path.join(__dirname, "../frontend/build")));

  //app.get("*", (req, res) =>
    //res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  //);
//app.get("/*", (req, res) => {
  //res.sendFile("index.html", { root: path.resolve(__dirname, "../frontend/build") });
//});



//} else {
  app.get("/", (req, res) => {
    res.send("WELCOME MISA 🙌");
  });
//}

// Error handling
//app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
*/





/*

import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to Database
db()
  .then(() => console.log("🟢 Database connected successfully"))
  .catch((err) => {
    console.error("🔴 Database connection error:", err);
    process.exit(1);
  });

// ✅ Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ✅ Prevent caching
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

// ✅ CORS configuration
const allowedOrigins = [
  "https://ubiquitous-bublanina-92e994.netlify.app", // Netlify
  "http://localhost:3000", // Local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// ✅ Serve frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("WELCOME MISA 🙌 Backend is running...");
  });
}

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
*/


/*
import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to Database
db()
  .then(() => console.log("🟢 Database connected successfully"))
  .catch((err) => {
    console.error("🔴 Database connection error:", err);
    process.exit(1);
  });

// ✅ Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ✅ Prevent caching
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

// ✅ CORS configuration
const allowedOrigins = [
  "https://ubiquitous-bublanina-92e994.netlify.app", // Netlify frontend
  "http://localhost:3000", // Local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allow cookies
  })
);

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// ✅ Root route (no serving React here – frontend is on Netlify)
app.get("/", (req, res) => {
  res.send("WELCOME MISA 🙌 Backend is running...");
});

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
*/





import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uomRoutes from "./routes/uomRoutes.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ Connect to Database
db()
  .then(() => console.log("🟢 Database connected successfully"))
  .catch((err) => {
    console.error("🔴 Database connection error:", err);
    process.exit(1);
  });

// ✅ Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ✅ Prevent caching
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

// ✅ CORS configuration
const allowedOrigins = [
  "https://ubiquitous-bublanina-92e994.netlify.app", // Netlify frontend
  "http://localhost:3000", // Local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allow cookies & auth headers
  })
);

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/uom", uomRoutes);

// ✅ Root route (Backend check only)
app.get("/", (req, res) => {
  res.send("WELCOME MISA 🙌 Backend is running on Render!");
});

// ✅ Error Handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
