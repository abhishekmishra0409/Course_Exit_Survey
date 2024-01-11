import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllFeedback = () => {
    const [allFeedback, setAllFeedback] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-all-feedback');
                setAllFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchData();
    }, []);

    const calculateAverageRating = (ratings) => {
        const ratingValues = Object.values(ratings).map(Number); // Convert to numbers
        const sum = ratingValues.reduce((acc, rating) => acc + rating, 0);
        const average = sum / ratingValues.length;
        return isNaN(average) ? 'N/A' : average.toFixed(2);
    };

    return (
        <div>
            <h2>All Feedback</h2>
            {allFeedback.map((feedback) => (
                <div key={feedback._id}>
                    <h3>{feedback.name}</h3>
                    <p>Enrollment: {feedback.enrollment}</p>
                    <p>Course: {feedback.selectedCourse}</p>
                    <p>Branch: {feedback.selectedBranch}</p>
                    <p>Semester: {feedback.selectedSemester}</p>
                    <p>Session: {feedback.session}</p>
                    <h4>Subject Feedback</h4>
                    <ul>
                        {Object.entries(feedback.subjects).map(([subject, ratings]) => (
                            <li key={subject}>
                                <strong>{subject}:</strong> {Object.values(ratings).join(', ')} |
                                <span> Average Rating: {calculateAverageRating(ratings)}</span>
                            </li>
                        ))}
                    </ul>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default AllFeedback;
