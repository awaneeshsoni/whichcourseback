const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://awaneeshsonidev:gwtKmWNqOLEd6Qpq@cluster0.xyycd.mongodb.net/");
console.log("monogp")

app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
