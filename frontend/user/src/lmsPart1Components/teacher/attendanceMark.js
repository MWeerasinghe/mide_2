import React, { useState } from "react";
import "./AttendanceMarking.css";

const AttendanceMarkingWithLock = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  const years = ["2023", "2024"];
  const grades = ["6", "7", "8", "9", "10", "11"];
  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];

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
        term1: 10,
        term2: 12,
        term3: 8,
        locks: { term1: true, term2: true, term3: true },
      },
      {
        id: 2,
        name: "Jane Smith",
        user_id: "U002",
        term1: 15,
        term2: 14,
        term3: 16,
        locks: { term1: true, term2: true, term3: true },
      },
      {
        id: 3,
        name: "Sam Wilson",
        user_id: "U003",
        term1: 9,
        term2: 11,
        term3: 10,
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

  const handleAttendanceChange = (id, term, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, [term]: Math.max(0, student[term] + value) }
          : student
      )
    );
  };

  const saveAttendance = (id) => {
    const student = students.find((s) => s.id === id);

    // Simulate saving data to an API
    console.log("Saving attendance for:", student);

    alert(`Attendance for ${student.name} saved successfully.`);
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Mark Attendance with Locking</h2>
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
        <table className="attendance-table">
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
                    <div className="attendance-counter">
                      <button
                        disabled={student.locks[term]}
                        onClick={() => handleAttendanceChange(student.id, term, -1)}
                      >
                        -
                      </button>
                      <span>{student[term]}</span>
                      <button
                        disabled={student.locks[term]}
                        onClick={() => handleAttendanceChange(student.id, term, 1)}
                      >
                        +
                      </button>
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
                  <button onClick={() => saveAttendance(student.id)} className="save-button">
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

export default AttendanceMarkingWithLock;
