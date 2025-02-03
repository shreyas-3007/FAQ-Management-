const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/route");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

module.exports = app;

const PORT = 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  });
});
