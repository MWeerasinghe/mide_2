import React, { useState } from "react";
import "./AddResults.css";

const AddResultsPage = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  const years = ["2023", "2024"];
  const grades = ["6", "7", "8", "9", "10", "11"];
  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
  const gradeOptions = ["A", "B", "C", "D", "F"];

  const fetchStudentData = () => {
    if (!year || !grade || !subject) {
      alert("Please select year, grade, and subject.");
      return;
    }

    // Simulate fetching data from an API
    const dummyStudents = [
      {
        id: 1,
        name: "John Doe",
        user_id: "U001",
        term1: "A",
        term2: "B",
        term3: "C",
        locks: { term1: true, term2: true, term3: true },
      },
      {
        id: 2,
        name: "Jane Smith",
        user_id: "U002",
        term1: "B",
        term2: "A",
        term3: "A",
        locks: { term1: true, term2: true, term3: true },
      },
      {
        id: 3,
        name: "Sam Wilson",
        user_id: "U003",
        term1: "C",
        term2: "C",
        term3: "D",
        locks: { term1: true, term2: true, term3: true },
      },
    ];
    setStudents(dummyStudents);
  };

  const toggleLock = (id, term) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...student,
              locks: { ...student.locks, [term]: !student.locks[term] },
            }
          : student
      )
    );
  };

  const handleGradeChange = (id, term, grade) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [term]: grade } : student
      )
    );
  };

  const saveResults = (id) => {
    const student = students.find((s) => s.id === id);

    // Simulate saving data to an API
    console.log("Saving results for:", student);

    alert(`Results for ${student.name} saved successfully.`);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Add Results with Locking</h2>
        <div className="filters">
          <div>
            <label>Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Grade</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button onClick={fetchStudentData} className="fetch-button">
            Fetch Students
          </button>
        </div>
      </div>

      {students.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User ID</th>
              <th>Term 1</th>
              <th>Term 2</th>
              <th>Term 3</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.user_id}</td>
                {["term1", "term2", "term3"].map((term) => (
                  <td key={term}>
                    <div className="results-selector">
                      <select
                        value={student[term]}
                        onChange={(e) =>
                          handleGradeChange(student.id, term, e.target.value)
                        }
                        disabled={student.locks[term]}
                      >
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                      <button
                        className="lock-button"
                        onClick={() => toggleLock(student.id, term)}
                      >
                        {student.locks[term] ? "🔒" : "🔓"}
                      </button>
                    </div>
                  </td>
                ))}
                <td>
                  <button onClick={() => saveResults(student.id)} className="save-button">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddResultsPage;
