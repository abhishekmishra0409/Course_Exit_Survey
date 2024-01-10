import {useState} from "react";

export function CourseSurvey() {

    const [name, setName] = useState('');
    const [enrollment, setEnrollment] = useState('');
    const [session, setSession] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [error, setError] = useState('');

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        setSelectedBranch('');
        setSelectedSemester('');
    };

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
        setSelectedSemester('');
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation for enrollment length
        if (enrollment.length !== 12) {
            setError('Enrollment Number must be Wrong.');
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name,
                    enrollment,
                    selectedCourse,
                    selectedBranch,
                    selectedSemester,
                    session
                })
            });
            const handleClearForm = () => {
                setName('');
                setEnrollment('');
                setSelectedCourse('');
                setSelectedBranch('');
                setSelectedSemester('');
                setSession('');
            };

            const data = await response.json();

            // Check if the response contains an error message
            if (data.error) {
                alert(`Error: Enrollment number has already do it`)
                // Handle the error, display an error message, etc.
            } else {
                // Example: Display a success message to the user
                alert('Registration successful!');
                handleClearForm();
            }
        } catch (error) {
                console.log('Network Error:', error);
        }

    };


    return (
        <>
            <div>
                <div className="container">
                    <form id="registration-form" onSubmit={handleSubmit} method={"POST"} >
                        <h2>Course Exit Survey Form</h2>
                        <label>Name:</label>
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter Name"/>
                        <label>Enrollment:</label>
                        <input type="text" name="enrollment" value={enrollment} onChange={(e) => setEnrollment(e.target.value)} required placeholder={"0822XXXXXX"}/>
                        {error && <div style={{ color: 'red'  }}>{error}</div>}
                        <label>Course:</label>
                        <select value={selectedCourse} required name="course" onChange={handleCourseChange}>
                            <option value="">---Select Course---</option>
                            <option value={'Btech'}>Btech</option>
                            <option value={'Mtech'}>Mtech</option>
                            <option value={'MBA'}>MBA</option>

                        </select>
                        <label>Branch:</label>
                        <select value={selectedBranch} onChange={handleBranchChange} required name="branch">
                            <option value="">---Select Branch---</option>
                            {selectedCourse === 'Btech' && (
                                <>
                                    <option value="CS">Computer Science and Engineering</option>
                                    <option value="ECE">Electronics and Communication Engineering</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ME">Mechenical Engineering</option>
                                    <option value="CE">Civil Engineering</option>
                                </>
                            )}
                            {selectedCourse === 'Mtech' && (
                                <>
                                    <option value="ECE">Electronics and Communication Engineering</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ME">Mechenical Engineering</option>
                                    <option value="CE">Civil Engineering</option>
                                </>
                            )}
                            {selectedCourse === 'MBA' && (
                                <>
                                    <option value="finance">Finance</option>
                                    <option value="marketing">Marketing</option>
                                </>
                            )}
                        </select>
                        <label>Semester:</label>
                        <select value={selectedSemester} required name="semester" onChange={handleSemesterChange}>
                            <option value={""}>---Select Semester---</option>
                            {selectedCourse === 'Btech' && (
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
                            {selectedCourse === 'Mtech' && (
                                <>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </>
                            )}
                            {selectedCourse === 'MBA' && (
                                <>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </>
                            )}

                        </select>
                        <label>Session:</label>
                        <input type="text" name="session" value={session} onChange={(e) => setSession(e.target.value)} required placeholder="YYYY-YYYY" /><br />
                        <label>Rate the Subject acc ti question</label>
                        <table>
                            <tr>
                                <th>S.no</th>
                                <th>Parameter / Subject#</th>
                                <th>BT-101</th>
                            </tr>
                            <tr>
                                <td>Anom</td>
                                <td>19</td>
                                <td>Male</td>
                            </tr>
                            <tr>
                                <td>Megha</td>
                                <td>19</td>
                                <td>Female</td>
                            </tr>
                            <tr>
                                <td>Subham</td>
                                <td>25</td>
                                <td>Male</td>
                            </tr>
                        </table>

                        <button type="submit" >Register</button>
                    </form>
                </div>
                <div></div>
            </div>
        </>
    );
}
