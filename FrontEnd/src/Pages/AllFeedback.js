import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllFeedback.css';

const AllFeedback = () => {
    const [allFeedback, setAllFeedback] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedSession, setSelectedSession] = useState('');
    const [courseOptions, setCourseOptions] = useState([]);
    const [branchOptions, setBranchOptions] = useState([]);
    const [semesterOptions, setSemesterOptions] = useState([]);
    const [sessionOptions, setSessionOptions] = useState([]);

    const filteredFeedback = allFeedback.filter((feedback) =>
        (selectedCourse ? feedback.selectedCourse === selectedCourse : true) &&
        (selectedBranch ? feedback.selectedBranch === selectedBranch : true) &&
        (selectedSemester ? feedback.selectedSemester === selectedSemester : true) &&
        (selectedSession ? feedback.session === selectedSession : true)
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-all-feedback');
                setAllFeedback(response.data);

                // Extract unique options for dropdowns
                const uniqueCourses = [...new Set(response.data.map((feedback) => feedback.selectedCourse))];
                const uniqueBranches = [...new Set(response.data.map((feedback) => feedback.selectedBranch))];
                const uniqueSemesters = [...new Set(response.data.map((feedback) => feedback.selectedSemester))];
                const uniqueSessions = [...new Set(response.data.map((feedback) => feedback.session))];

                setCourseOptions(uniqueCourses);
                setBranchOptions(uniqueBranches);
                setSemesterOptions(uniqueSemesters);
                setSessionOptions(uniqueSessions);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchData();
    }, [selectedCourse, selectedBranch, selectedSemester, selectedSession]);

    const calculateAverageRating = (ratings) => {
        const ratingValues = Object.values(ratings).map(Number);
        const sum = ratingValues.reduce((acc, rating) => acc + rating, 0);
        const average = sum / ratingValues.length;
        return isNaN(average) ? 'N/A' : average.toFixed(2);
    };

    const calculateSubjectQuestionAverage = (subject, questionIndex) => {
        const questionRatings = filteredFeedback.map((feedback) =>
            feedback.subjects[subject] ? feedback.subjects[subject][questionIndex] : null
        );
        return calculateAverageRating(questionRatings);
    };

    const subjectColumns = Array.from(
        new Set(filteredFeedback.flatMap((feedback) => Object.keys(feedback.subjects)))
    );

    const overallAverages = subjectColumns.map((subject) => ({
        subject,
        averages: Array.from({ length: 3 }, (_, questionIndex) =>
            calculateSubjectQuestionAverage(subject, questionIndex)
        ),
    }));

    const overallAverageRow = (
        <tr>
            <td>Averages</td>
            {overallAverages.map(({ averages }, subjectIndex) => (
                <React.Fragment key={subjectIndex}>
                    {averages.map((average, questionIndex) => (
                        <td key={questionIndex}>{average}</td>
                    ))}
                </React.Fragment>
            ))}
        </tr>
    );

    return (
        <div>
            <h2>All Feedback</h2>
            <div>
                <label>Search by Course:</label>
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">All Courses</option>
                    {courseOptions.map((course) => (
                        <option key={course} value={course}>
                            {course}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Search by Branch:</label>
                <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                >
                    <option value="">All Branches</option>
                    {branchOptions.map((branch) => (
                        <option key={branch} value={branch}>
                            {branch}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Search by Semester:</label>
                <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                >
                    <option value="">All Semesters</option>
                    {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>
                            {semester}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Search by Session:</label>
                <select
                    value={selectedSession}
                    onChange={(e) => setSelectedSession(e.target.value)}
                >
                    <option value="">All Sessions</option>
                    {sessionOptions.map((session) => (
                        <option key={session} value={session}>
                            {session}
                        </option>
                    ))}
                </select>
            </div>

            {filteredFeedback.map((feedback) => (
                <div key={feedback._id}>
                    <h3>{feedback.name}</h3>
                    <p>Enrollment: {feedback.enrollment}</p>
                    <p>Course: {feedback.selectedCourse}</p>
                    <p>Branch: {feedback.selectedBranch}</p>
                    <p>Semester: {feedback.selectedSemester}</p>
                    <p>Session: {feedback.session}</p>
                    <h4>Subject Feedback</h4>
                    <table>
                        <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Question 1</th>
                            <th>Question 2</th>
                            <th>Question 3</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedback.subjects &&
                            Object.entries(feedback.subjects).map(([subject, ratings], rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{subject}</td>
                                    {Object.values(ratings).map((value, colIndex) => (
                                        <td key={colIndex}>{value !== null ? value : '-'}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <hr />
                </div>
            ))}

            <h4>Overall Average Table</h4>
            <table>
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Question 1</th>
                    <th>Question 2</th>
                    <th>Question 3</th>
                </tr>
                </thead>
                <tbody>
                {overallAverages.map(({ subject, averages }, subjectIndex) => (
                    <tr key={subjectIndex}>
                        <td>{subject}</td>
                        {averages.map((average, questionIndex) => (
                            <td key={questionIndex}>{average}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllFeedback;
