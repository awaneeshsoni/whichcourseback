const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  professors: [
    {
      name: { type: String, required: true },
      slug: { type: String, required: true  },
      ratings: {
        attendance: { type: Number, default: 0 },
        grading: { type: Number, default: 0 },
        difficulty: { type: Number, default: 0 },
        overall: { type: Number, default: 0 },
        entries: {type: Number, default: 0},
      },
    },
  ],
});

module.exports = mongoose.model('Course', CourseSchema);
