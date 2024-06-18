// Import required modules
const express = require("express");
const cors = require("cors");
const db = require("./database/database");

// Define variables
const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const indexRouter = require("./routes/index");
const testRouter = require("./routes/test");
const dashboardRouter = require("./routes/dashboard");
const apparelsRouter = require("./routes/apparels");
const outfitsRouter = require("./routes/outfits");

// Use routes
app.use("/", indexRouter);
app.use("/test", testRouter);
app.use("/dashboard", dashboardRouter);
app.use("/apparels", apparelsRouter);
app.use("/outfits", outfitsRouter);

// Start server
app.listen(port, () => {
  console.log(`dClutter backend server running on port ${port}`);
});
