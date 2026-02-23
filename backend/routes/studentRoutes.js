const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/studentControllers');

// Pre-hook middleware — runs before create and update
const validateStudent = (req, res, next) => {
    const { name, email, course, gender, age } = req.body;

    // Validation: check required fields
    if (!name || !email || !course || !gender || !age) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Sanitization: trim whitespace and lowercase email
    req.body.name = name.trim();
    req.body.email = email.toLowerCase().trim();
    req.body.course = course.trim();
    req.body.gender = gender.trim();
    req.body.age = parseInt(age);

    next(); // Pass to controller
};

router.route('/')
    .get(getStudents)
    .post(validateStudent, createStudent);

router.route('/:id')
    .get(getStudent)
    .put(validateStudent, updateStudent)
    .delete(deleteStudent);

module.exports = router;