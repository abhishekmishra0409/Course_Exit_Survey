// src/App.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        course: '',
        branch: '',
        session: '',
        semester: '',
        subjects: {},
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleCourseChange = (selectedCourse) => {
        setFormData((prevData) => ({
            ...prevData,
            course: selectedCourse,
            branch: '',
            semester: '',
            subjects: {},
        }));
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            branch: '',
            semester: '',
            subjects: {},
        }));
    }, [formData.course]);

    const handleSubjectRatingChange = (subject, question, rating) => {
        setFormData((prevData) => ({
            ...prevData,
            subjects: {
                ...prevData.subjects,
                [subject]: {
                    ...prevData.subjects[subject],
                    [question]: rating,
                },
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.rollNo ||
            !formData.course ||
            !formData.branch ||
            !formData.session ||
            !formData.semester ||
            Object.keys(formData.subjects).length === 0
        ) {
            alert('Please fill in all the required fields and provide feedback for all subjects.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/submit-feedback', formData);

            const handleClearForm = () => {
                setFormData({
                    name: '',
                    rollNo: '',
                    course: '',
                    branch: '',
                    session: '',
                    semester: '',
                    subjects: {},
                });
            };

            // Check if the response contains an error message
            if (response.data.error) {
                alert(`Error: Enrollment number has already do it`)
                // Handle the error, display an error message, etc.
            } else {
                // Example: Display a success message to the user
                alert('Registration successful!');
                handleClearForm();
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
        <>
            <div className='nav'>
                <div className='clglogo'>
                    <img src="/images/SVCE%20Logo.jpg" alt=""/>
                </div>
                <div className='c-name'>
                    <h2>Swami Vivekanand Groups of Institutions</h2>
                    <p>Engineering | Pharmacy | Management | Diploma</p>
                </div>
                <div className='feedback-link'>
                    <Link to="/all-feedback">All Feedback</Link>
                </div>
            </div>

            <div className='mdiv'>

                <div>

                    <div className='upper'>
                        <div className='first'>
                            <h1>Feedback Form</h1>

                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Roll No:</label>
                            <input
                                type="text"
                                name="rollNo"
                                value={formData.rollNo}
                                onChange={handleInputChange}
                                required
                            />

                            <label>Course:</label>
                            <select
                                name="course"
                                value={formData.course}
                                onChange={(e) => handleCourseChange(e.target.value)}
                                required
                            >
                                <option value="">Select...</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="MBA">MBA</option>

                            </select>

                            <label>Branch:</label>
                            <select
                                name="branch"
                                value={formData.branch}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select...</option>
                                {formData.course === 'B.Tech' && (
                                    <>
                                        <option value="CS">Computer Science and Engineering</option>
                                        <option value="ECE">Electronics and Communication Engineering</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="ME">Mechenical Engineering</option>
                                        <option value="CE">Civil Engineering</option>
                                    </>
                                )}
                                {formData.course === 'M.Tech' && (
                                    <>
                                        <option value="CS">Computer Science and Engineering</option>
                                        <option value="ECE">Electronics and Communication Engineering</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="ME">Mechenical Engineering</option>
                                        <option value="CE">Civil Engineering</option>
                                    </>
                                )}
                                {formData.course === 'MBA' && (
                                    <>
                                        <option value="Finance">Finance</option>
                                        <option value="Marketing">Marketing</option>
                                    </>
                                )}
                            </select>

                            <label>Session:</label>
                            <input
                                type="text"
                                name="session"
                                value={formData.session}
                                onChange={handleInputChange}
                                placeholder={"yyyy-yyyy"}
                                required
                            />
                        </div>
                        <div className='u-pic'>
                            picture
                        </div>
                    </div>
                    <div className='botom'>
                        <div className='b-left'>
                            <ul>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                            </ul>
                        </div>

                        <div className='b-right'>
                            <div className='sem'>

                                <label>Semester:</label>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select...</option>
                                    {formData.course === 'B.Tech' && (
                                        <>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </>
                                    )}
                                    {formData.course === 'MBA' && (
                                        <>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                            <option value="4">Semester 4</option>
                                        </>
                                    )}
                                    {formData.course === 'M.Tech' && (
                                        <>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                            <option value="4">Semester 4</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            <div className='tab'>
                                {formData.course && formData.branch && formData.semester && (
                                    <>
                                        <h2>Feedback Table</h2>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Questions / Subjects</th>
                                                {getSubjectsForFeedback(formData.course, formData.branch, formData.semester).map(
                                                    (subject) => (
                                                        <th key={subject}>{subject}</th>
                                                    )
                                                )}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getQuestions().map((question) => (
                                                <tr key={question}>
                                                    <td>Question {question + 1}</td>
                                                    {getSubjectsForFeedback(formData.course, formData.branch, formData.semester).map(
                                                        (subject) => (
                                                            <td key={subject}>
                                                                <select
                                                                    value={formData.subjects[subject]?.[question] || ''}
                                                                    onChange={(e) =>
                                                                        handleSubjectRatingChange(subject, question, e.target.value)
                                                                    }
                                                                    required
                                                                >
                                                                    <option value="">--Rate--</option>
                                                                    <option value="5">5 (Excellent)</option>
                                                                    <option value="4">4 (Very Good)</option>
                                                                    <option value="3">3 (Good)</option>
                                                                    <option value="2">2 (Fair)</option>
                                                                    <option value="1">1 (Poor)</option>
                                                                </select>
                                                            </td>
                                                        )
                                                    )}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>


                        </div>

                    </div>

                </div>
                <div className='btn'>
                    <button type="submit"
                            onClick={handleSubmit}>Submit Feedback
                    </button>
                </div>

            </div>


        </>
    );
};

const getSubjectsForFeedback = (course, branch, semester) => {
    const subjectsMapping = {
        'B.Tech': {
            'CS': {
                1: ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'],
                2: ['Subject 6', 'Subject 7', 'Subject 8', 'Subject 9', 'Subject 10'],
                3: ['Subject 11', 'Subject 12', 'Subject 13', 'Subject 14', 'Subject 15'],
                // Add subjects for other semesters
                // ...
            },
            'ECE': {
                1: ['Subject 16', 'Subject 17', 'Subject 18', 'Subject 19', 'Subject 20'],
                2: ['Subject 21', 'Subject 22', 'Subject 23', 'Subject 24', 'Subject 25'],
                3: ['Subject 26', 'Subject 27', 'Subject 28', 'Subject 29', 'Subject 30'],
                // Add subjects for other semesters
                // ...
            },
            // Add other branches...
        },
        'MBA': {
            'Finance': {
                1: ['Finance Subject 1', 'Finance Subject 2', 'Finance Subject 3', 'Finance Subject 4', 'Finance Subject 5'],
                2: ['Finance Subject 6', 'Finance Subject 7', 'Finance Subject 8', 'Finance Subject 9', 'Finance Subject 10'],
                3: ['Finance Subject 11', 'Finance Subject 12', 'Finance Subject 13', 'Finance Subject 14', 'Finance Subject 15'],
                // Add subjects for other semesters
                // ...
            },
            'Marketing': {
                1: ['Marketing Subject 1', 'Marketing Subject 2', 'Marketing Subject 3', 'Marketing Subject 4', 'Marketing Subject 5'],
                2: ['Marketing Subject 6', 'Marketing Subject 7', 'Marketing Subject 8', 'Marketing Subject 9', 'Marketing Subject 10'],
                3: ['Marketing Subject 11', 'Marketing Subject 12', 'Marketing Subject 13', 'Marketing Subject 14', 'Marketing Subject 15'],
                // Add subjects for other semesters
                // ...
            },
            // Add other branches...
        },
        'M.Tech': {
            'CS': {
                1: ['M.Tech CS Subject 1', 'M.Tech CS Subject 2', 'M.Tech CS Subject 3', 'M.Tech CS Subject 4', 'M.Tech CS Subject 5'],
                2: ['M.Tech CS Subject 6', 'M.Tech CS Subject 7', 'M.Tech CS Subject 8', 'M.Tech CS Subject 9', 'M.Tech CS Subject 10'],
                3: ['M.Tech CS Subject 11', 'M.Tech CS Subject 12', 'M.Tech CS Subject 13', 'M.Tech CS Subject 14', 'M.Tech CS Subject 15'],
                // Add subjects for other semesters
                // ...
            },
            'ECE': {
                1: ['M.Tech ECE Subject 1', 'M.Tech ECE Subject 2', 'M.Tech ECE Subject 3', 'M.Tech ECE Subject 4', 'M.Tech ECE Subject 5'],
                2: ['M.Tech ECE Subject 6', 'M.Tech ECE Subject 7', 'M.Tech ECE Subject 8', 'M.Tech ECE Subject 9', 'M.Tech ECE Subject 10'],
                3: ['M.Tech ECE Subject 11', 'M.Tech ECE Subject 12', 'M.Tech ECE Subject 13', 'M.Tech ECE Subject 14', 'M.Tech ECE Subject 15'],
                // Add subjects for other semesters
                // ...
            },
            // Add other branches...
        },
        // Add other courses...
    };

    return subjectsMapping[course]?.[branch]?.[semester] || [];
};


const getQuestions = () => [...Array(3).keys()];

export default App;
