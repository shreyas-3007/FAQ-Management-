const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/route");


const app = express();

app.use(express.json());
app.use("/faq",router);


app.get("/", (req, res) => {
  res.send("Backed Running Successfully");
});

const PORT = 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
    
  });
});