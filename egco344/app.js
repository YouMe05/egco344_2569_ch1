const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    { id: 'E001', name: 'Alice Johnson', department: 'Computer Science', gpa: 3.85 },
    { id: 'E002', name: 'Bob Smith', department: 'Computer Science', gpa: 3.72 },
    { id: 'E003', name: 'Carol White', department: 'Civil Engineering', gpa: 3.91 },
    { id: 'E004', name: 'David Brown', department: 'Mechanical Engineering', gpa: 3.65 },
    { id: 'E005', name: 'Eva Martinez', department: 'Electrical Engineering', gpa: 3.88 },
    { id: 'E006', name: 'Frank Lee', department: 'Civil Engineering', gpa: 3.76 },
    { id: 'E007', name: 'Grace Chen', department: 'Mechanical Engineering', gpa: 3.82 },
    { id: 'E008', name: 'Henry Wilson', department: 'Electrical Engineering', gpa: 3.79 }
];

// API 1: Get all students GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json({
        faculty: 'Faculty of Engineering',
        departments: groupedByDept
    });
});

// API 2: Get individual student GPA by student ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});