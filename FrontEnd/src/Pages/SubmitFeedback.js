// src/App.js

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import './Submit.css'


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
                    <Link to="/login">ADMIN</Link>
                </div>
            </div>

                    <h1 className='mainHead'>Course Exit Survey</h1>
            <div className='mdiv'>
                <div>

                    <div className='upper'>
                        <div className='first'>
                            <h3>(Enter your details carefully)</h3>

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
                            <select
                                name="session"
                                value={formData.session}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select...</option>
                                <option value="2015-16">2015-16</option>
                                <option value="2016-17">2016-17</option>
                                <option value="2017-18">2017-18</option>
                                <option value="2018-19">2018-19</option>
                                <option value="2019-20">2019-20</option>
                                <option value="2020-21">2020-21</option>
                                <option value="2021-22">2021-22</option>
                                <option value="2022-23">2022-23</option>
                                <option value="2023-24">2023-24</option>
                                <option value="2024-25">2024-25</option>
                                <option value="2025-26">2025-26</option>
                                <option value="2026-27">2026-27</option>
                                <option value="2027-28">2027-28</option>
                                <option value="2028-29">2028-29</option>
                                <option value="2029-30">2029-30</option>
                                <option value="2030-31">2030-31</option>
                                <option value="2031-32">2031-32</option>
                                <option value="2032-33">2032-33</option>
                                <option value="2033-34">2033-34</option>
                                <option value="2034-35">2034-35</option>
                                

                            </select>
                        </div>
                        <div className='u-pic'>
                             <img src='/images/5211204.jpg' alt=''/>
                        </div>

                    </div>
                    <div className='botom'>
                    
                        <div className='b-left'>
                        
                           <h2 className='tableHead'>Questions</h2>
                            <ul>
                                <li className='firstLi'>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here let assume question is bigger than </li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here let assume question is bigger than</li>
                                <li>Question Asked for Rating here  let assume question is bigger than</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here  let assume question is bigger than</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                                <li>Question Asked for Rating here</li>
                            </ul>
                        </div>

                        <div className='b-right'>
                            <div className='sem'>

                                <div><label className='tableHead semester'>Semester:</label></div>
                               
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
                                    
                                        <table>
                                            <thead>
                                            <tr>
                                                {/* <th>Questions / Subjects</th> */}
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
                                                    {/* <td>Question {question + 1}</td> */}
                                                    {getSubjectsForFeedback(formData.course, formData.branch, formData.semester).map(
                                                        (subject) => (
                                                            <td key={subject}>
                                                                <select
                                                                    className='tableSelection'
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
            <footer>
                <div><h5>All rights reserved &copy; by SVCE</h5></div>
                <div className="names">
                    <h2>Designed and Developed by</h2>
                    <div className='ourNames'>
                        <h5>Anurag Solanki </h5>
                        <h5>Abhishek Mishra</h5>
                        <h5> Jayesh karma</h5>
                    </div>
                </div>
            </footer>

        </>
    );
};

const getSubjectsForFeedback = (course, branch, semester) => {
    const subjectsMapping = {
        'B.Tech': {
            'CS': {
                1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3: ['ES-301', 'CS-302', 'Cs-303', 'CS-304', 'CS-305'],
                4: ['BT-401', 'CS-402', 'CS-403', 'CS-404', 'CS-405'],
                5: ['CS-501', 'CS-502', 'CS-503', 'CS-504', 'CS-505'],
                6: ['CS-601', 'CS-602', 'CS-603', 'CS-604', 'CS-605'],
                7: ['CS-701', 'CS-702', 'CS-703', 'CS-704', 'CS-705'],
                8: ['CS-801', 'CS-802', 'CS-803', 'CS-804', 'CS-805'],

                // Add subjects for other semesters
                // ...
            },
            'IT':{
                1:['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2:['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3:['ES-301', 'IT-302', 'IT-303', 'IT-304', 'IT-305'],
                4:['BT-401', 'IT-402', 'IT-403', 'IT-404', 'IT-405'],
                5:['IT-501', 'IT-502', 'IT-503', 'IT-504', 'IT-505'],
                6:['IT-601', 'IT-602', 'IT-603', 'IT-604', 'IT-605'],
                7:['IT-701', 'IT-702', 'IT-703', 'IT-704', 'IT-705'],
                8:['IT-801', 'IT-802', 'IT-803', 'IT-804', 'IT-805'],
            },
            'ECE': {
                1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3: ['BT-301', 'EC-302', 'EC-303', 'EC-304', 'EC-305'],
                4: ['ES-401', 'EC-402', 'EC-403', 'EC-404', 'EC-405'],
                5: ['EC-501', 'EC-502', 'EC-503', 'EC-504', 'EC-505'],
                6: ['EC-601', 'EC-602', 'EC-603', 'EC-604', 'EC-605'],
                7: ['EC-701', 'EC-702', 'EC-703', 'EC-704', 'EC-705'],
                8: ['EC-801', 'EC-802', 'EC-803', 'EC-804', 'EC-805'],
                // Add subjects for other semesters
                // ...
            },
            'CE': {
                1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3: ['CE-301', 'CE-302', 'CE-303', 'CE-304', 'CE-305'],
                4: ['CE-401', 'CE-402', 'CE-403', 'CE-404', 'CE-405'],
                5: ['CE-501', 'CE-502', 'CE-503', 'CE-504', 'CE-505'],
                6: ['CE-601', 'CE-602', 'CE-603', 'CE-604', 'CE-605'],
                7: ['CE-701', 'CE-702', 'CE-703', 'CE-704', 'CE-705'],
                8: ['CE-801', 'CE-802', 'CE-803', 'CE-804', 'CE-805'],
                // Add subjects for other semesters
                // ...
            },
            'ME': {
                1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3: ['ME-301', 'ME-302', 'ME-303', 'ME-304', 'ME-305'],
                4: ['ME-401', 'ME-402', 'ME-403', 'ME-404', 'ME-405'],
                5: ['ME-501', 'ME-502', 'ME-503', 'ME-504', 'ME-505'],
                6: ['ME-601', 'ME-602', 'ME-603', 'ME-604', 'ME-605'],
                7: ['ME-701', 'ME-702', 'ME-703', 'ME-704', 'ME-705'],
                8: ['ME-801', 'ME-802', 'ME-803', 'ME-804', 'ME-805'],
                // Add subjects for other semesters
                // ...
            },
            'EX': {
                1: ['BT-101', 'BT-102', 'BT-103', 'BT-104', 'BT-105'],
                2: ['BT-201', 'BT-202', 'BT-203', 'BT-204', 'BT-205'],
                3: ['EX-301', 'EX-302', 'EX-303', 'EX-304', 'EX-305'],
                4: ['EX-401', 'EX-402', 'EX-403', 'EX-404', 'EX-405'],
                5: ['EX-501', 'EX-502', 'EX-503', 'EX-504', 'EX-505'],
                6: ['EX-601', 'EX-602', 'EX-603', 'EX-604', 'EX-605'],
                7: ['EX-701', 'EX-702', 'EX-703', 'EX-704', 'EX-705'],
                8: ['EX-801', 'EX-802', 'EX-803', 'EX-804', 'EX-805'],
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


const getQuestions = () => [...Array(10).keys()];

export default App;
