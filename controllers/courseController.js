const Course = require("../models/Course");

// Get Course by Slug
exports.getCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  const { slug, profSlug, attendance, grading, difficulty, overall } = req.body;

  try {
    // Find the course by slug
    const course = await Course.findOne({ slug });
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Find the professor by slug
    const professor = course.professors.find((prof) => prof.slug === profSlug);
    if (!professor)
      return res.status(404).json({ message: "Professor not found" });

    // Calculate the new average for each rating
    
    newEntry = professor.ratings.entries + 1; 
    entry = professor.ratings.entries
    professor.ratings.attendance =
      (professor.ratings.attendance*entry + attendance) / newEntry;
    professor.ratings.grading = (professor.ratings.grading*entry + grading) / newEntry;
    professor.ratings.difficulty =
      (professor.ratings.difficulty*entry + difficulty) / newEntry;
    professor.ratings.overall = (professor.ratings.overall*entry + overall) / newEntry;
    professor.ratings.entries = professor.ratings.entries + 1;
    // Save the updated course
    await course.save();
    res.status(200).json({ message: "Rating updated successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Error updating rating", error: err });
  }
};

// Add a new Course
exports.addCourse = async (req, res) => {
  const { name, slug } = req.body; // Create a slug by removing spaces and converting to lowercase
  try {
    // Check if the course already exists
    const existingCourse = await Course.findOne({ slug });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already exists" });
    }

    // Create a new course
    const newCourse = new Course({
      name,
      slug,
      professors: [], // No professors initially
    });

    // Save the course
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (err) {
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

exports.addProff = async (req, res) => {
  const { name } = req.body;
  const slug = name.toLowerCase().replace(/\s+/g, ""); // Slug for the professor (lowercase and no spaces)

  try {
    // Find the course by slug
    const course = await Course.findOne({ slug: req.params.slug });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the professor already exists in the course
    const existingProfessor = course.professors.find(
      (prof) => prof.slug === slug
    );
    if (existingProfessor) {
      return res
        .status(400)
        .json({ message: "Professor already added to this course" });
    }

    // Add the professor to the course
    course.professors.push({
      name,
      slug,
      ratings: {
        attendance: 0,
        grading: 0,
        difficulty: 0,
        overall: 0,
      },
    });

    // Save the updated course
    await course.save();
    res.status(201).json({ message: "Professor added successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Error adding professor", error: err });
  }
};
