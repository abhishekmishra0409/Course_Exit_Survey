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
    const [numberOfStudents, setNumberOfStudents] = useState(0);

    const [selectedSubject, setSelectedSubject] = useState('');
    const [subjectRatingsCount, setSubjectRatingsCount] = useState({});

    const [ratingsCount, setRatingsCount] = useState({
        subjectCounts: {}, // Total number of students for each rating for each subject
        questionCounts: {}, // Total number of students for each rating for each question
    });

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

                // Calculate and set the number of students based on the selected criteria
                const filteredStudents = response.data.filter((feedback) =>
                    (selectedCourse ? feedback.selectedCourse === selectedCourse : true) &&
                    (selectedBranch ? feedback.selectedBranch === selectedBranch : true) &&
                    (selectedSemester ? feedback.selectedSemester === selectedSemester : true) &&
                    (selectedSession ? feedback.session === selectedSession : true)
                );
                setNumberOfStudents(filteredStudents.length);

                // Calculate ratings counts for each subject and question
                const newRatingsCount = {
                    subjectCounts: {},
                    questionCounts: {},
                };

                filteredStudents.forEach((feedback) => {
                    Object.entries(feedback.subjects).forEach(([subject, ratings]) => {
                        if (!newRatingsCount.subjectCounts[subject]) {
                            newRatingsCount.subjectCounts[subject] = {};
                        }

                        if (!newRatingsCount.questionCounts[subject]) {
                            newRatingsCount.questionCounts[subject] = {};
                        }

                        Object.entries(ratings).forEach(([question, rating]) => {
                            // Count for each rating for each subject
                            if (!newRatingsCount.subjectCounts[subject][rating]) {
                                newRatingsCount.subjectCounts[subject][rating] = 1;
                            } else {
                                newRatingsCount.subjectCounts[subject][rating]++;
                            }

                            // Count for each rating for each question
                            if (!newRatingsCount.questionCounts[subject][question]) {
                                newRatingsCount.questionCounts[subject][question] = {};
                            }

                            if (!newRatingsCount.questionCounts[subject][question][rating]) {
                                newRatingsCount.questionCounts[subject][question][rating] = 1;
                            } else {
                                newRatingsCount.questionCounts[subject][question][rating]++;
                            }
                        });
                    });
                });

                setRatingsCount(newRatingsCount);
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

    const calculatePercentage = (value, max) => {
        return ((value / max) * 100).toFixed(2);
    };




    useEffect(() => {
        // Calculate ratings counts for the selected subject
        const newSubjectRatingsCount = {
            questionCounts: {},
        };

        // Filter feedback data based on the selected subject
        const filteredFeedbackForSubject = allFeedback.filter((feedback) =>
            selectedSubject ? feedback.subjects[selectedSubject] : true
        );

        // Calculate ratings counts for each question
        filteredFeedbackForSubject.forEach((feedback) => {
            if (feedback.subjects[selectedSubject]) {
                Object.entries(feedback.subjects[selectedSubject]).forEach(([question, rating]) => {
                    if (!newSubjectRatingsCount.questionCounts[question]) {
                        newSubjectRatingsCount.questionCounts[question] = {};
                    }

                    if (!newSubjectRatingsCount.questionCounts[question][rating]) {
                        newSubjectRatingsCount.questionCounts[question][rating] = 1;
                    } else {
                        newSubjectRatingsCount.questionCounts[question][rating]++;
                    }
                });
            }
        });

        setSubjectRatingsCount(newSubjectRatingsCount);
    }, [selectedSubject, allFeedback]);

    return (
        <>
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

                {filteredFeedback.length > 0 && selectedSession && selectedSemester && selectedBranch && selectedCourse &&(
                    <>
                        <div>
                            <p>Number of Students: {numberOfStudents}</p>
                        </div>

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
                <div>
                    <h4>Subject-wise Ratings Count</h4>
                    <label>Select Subject:</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="">Select Subject</option>
                        {subjectColumns.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>

                    {selectedSubject && (
                        <table>
                            <thead>
                            <tr>
                                <th>Question</th>
                                <th>Rating 1</th>
                                <th>Rating 2</th>
                                <th>Rating 3</th>
                                <th>Rating 4</th>
                                <th>Rating 5</th>
                                <th>Percentage</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(subjectRatingsCount.questionCounts).map(([question, ratings]) => {
                                const totalCount = ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5'];

                                // Find the highest rating
                                const highestRating = Object.keys(ratings).reduce((maxRating, rating) => {
                                    return Number(rating) > Number(maxRating) ? rating : maxRating;
                                }, '1');
                                
                                // Calculate the percentage based on the highest rating count
                                const percentage = (ratings[highestRating] / numberOfStudents) * 100 || 0;

                                return (
                                    <tr key={question}>
                                        <td>{question}</td>
                                        <td>{ratings['1'] || 0}</td>
                                        <td>{ratings['2'] || 0}</td>
                                        <td>{ratings['3'] || 0}</td>
                                        <td>{ratings['4'] || 0}</td>
                                        <td>{ratings['5'] || 0}</td>
                                        <td>{percentage.toFixed(2)}% at Rating : {highestRating}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}

                </div>
                    </>
                 )}
            </div>
        </>
    );
};

export default AllFeedback;
