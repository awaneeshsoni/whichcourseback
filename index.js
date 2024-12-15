const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const corsOptions = {
  origin: ["https://whichcourse.vercel.app", "http://localhost:5173"], // Replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);
console.log("monogp");

app.use("/api/courses", courseRoutes);
app.get('/', (req,res)=>{
    res.send("Working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
