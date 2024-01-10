const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/Course-registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        required: true,
        unique: true,
    },
    selectedCourse: {
        type: String,
        required: true,
    },
    selectedBranch: {
        type: String,
        required: true,
    },
    selectedSemester: {
        type: String,
        required: true,
    },
    session: {
        type: String,
        required: true,
    },
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, enrollment, selectedCourse, selectedBranch, selectedSemester, session } = req.body;

    try {
        const newRegistration = new Registration({
            name,
            enrollment,
            selectedCourse,
            selectedBranch,
            selectedSemester,
            session,
        });

        await newRegistration.save();

        console.log('Data saved to MongoDB:', newRegistration);
        res.json({ message: 'Data received and saved successfully.' });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.enrollment) {
            // Enrollment field is not unique
            res.json({ error: 'Enrollment must be unique.' });
        } else {
            console.error('Error saving data to MongoDB:', error);
            res.json({ error: 'Internal Server Error' });
        }
    }
});  // Add a closing parenthesis here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
