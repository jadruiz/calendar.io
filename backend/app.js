const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Import Middlewares
const loggerMiddleware = require("./src/api/v1/middlewares/loggerMiddleware");
const errorHandler = require("./src/api/v1/middlewares/errorMiddleware");
const authMiddleware = require("./src/api/v1/middlewares/authMiddleware");
// Import Routes
const authRoutes = require("./src/api/v1/routes/authRoutes");
const calendarRoutes = require("./src/api/v1/routes/calendarRoutes");
const userRoutes = require("./src/api/v1/routes/userRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/calendars", authMiddleware, calendarRoutes);
app.use("/api/v1/users", authMiddleware, userRoutes);

app.use(errorHandler);

module.exports = app;
