const express = require('express');
const { getCourse, addCourse, updateCourse, addProff } = require('../controllers/courseController');
const router = express.Router();

router.get('/:slug', getCourse);
router.post('/', addCourse);
router.post('/:slug', addProff)
router.put('/:slug', updateCourse)

module.exports = router;
