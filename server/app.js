const express = require("express");
const cors = require("cors");
const { configDotenv } = require("dotenv");
const path = require("path");

const connectDb = require("./dbConnection/db.js");
const stdRouter = require("./routes/stdRouter.js");
const stdSubRouter = require("./routes/stdSubRouter.js");
const trainerRouter = require("./routes/trainerRouter.js");
const otpRouter = require("./routes/otpRouter.js");

configDotenv();

const app = express();

connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// ================= API ROUTES =================
app.use("/api/std", stdRouter);
app.use("/api/std/subject", stdSubRouter);
app.use("/api/trainer", trainerRouter);
app.use("/api/otp", otpRouter);

// ================= FRONTEND SERVE =================

// Serve React build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// React Router handle karega
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});