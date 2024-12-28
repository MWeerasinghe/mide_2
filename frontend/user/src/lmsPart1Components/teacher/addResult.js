import React, { useState } from "react";
import axios from "axios";
import "./AddResults.css";

const AddResultsPage = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];

  const grades = ["6", "7", "8", "9", "10", "11"];
  const subjects = [
    { label: "අභිධර්මය", value: "a" },
    { label: "බුද්ධ චරිතය", value: "b" },
    { label: "පාලි", value: "p" },
  ];
  const gradeOptions = ["NO", "A+", "B+", "C+", "D+", "A", "B", "C", "D", "F", "A-", "B-", "C-", "D-"];

  const fetchStudentData = async () => {
    if (!year || !grade || !subject) {
      alert("Please select year, grade, and subject.");
      return;
    }
  
    try {
      const response = await axios.get(
        "http://localhost:3000/api/teachers/getAllStudentsData",
        {
          params: { year, grade, subject },
        }
      );
  
      if(response.data.success === true) 
      {
        const studentsWithLocks = response.data.data.map((student) => ({
          ...student,
          locks: { t1_result: true, t2_result: true, t3_result: true },
        }));
        setStudents(studentsWithLocks);
      } 
      else 
      {
        alert("Students not found");
        setStudents('');
      }
    } catch (error) {
      alert("An error occurred while fetching student data: " + error.message);
    }
  };
  
  

  const toggleLock = (id, term) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? { ...student, locks: { ...student.locks, [term]: !student.locks[term] } }
          : student
      )
    );
  };
  

  const handleGradeChange = (id, term, grade) => 
  {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [term]: grade } : student
      )
    );
  };
  

  const saveResults = async (id) => 
  {
    const student = students.find((s) => s.id === id);
  
    if(!student) 
    {
      alert("Student not found.");
      return;
    }
  
    const payload = 
    {
      id: student.id,
      subject,
      year,
      grade,
      t1_result: student.t1_result,
      t2_result: student.t2_result,
      t3_result: student.t3_result,
    };
  
    try 
    {
      const confirmAction = window.confirm( `Are you sure you want to save the results for student ID ${student.user_id}?`);
    
      if (!confirmAction) {
        return;
      }

      const response = await axios.post("http://localhost:3000/api/teachers/setStudentGrade",payload);
      if (response.data.success === true) 
      {
        alert(`Grade saved successfully for ${student.name}.`);
      } 
      else 
      {
        alert("Failed to save results: " + response.data.message);
      }
    } 
    catch (error) 
    {
      alert("An error occurred while saving results: " + error.message);
    }
  };
  

  return (
    <div className="results-container">
      <div className="results-header">
        <h3> Students Results</h3>
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
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            {/* <label></label> */}
            <button onClick={fetchStudentData} className="fetch-button">Find Students</button>
          </div>
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
                <td>{student.name || "N/A"}</td>
                <td>{student.user_id}</td>
                {["t1_result", "t2_result", "t3_result"].map((term) => (
                  <td key={term}>
                    <div className="results-selector">
                      <select
                        value={student[term] || ""}
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
                  <button
                    onClick={() => saveResults(student.id)}
                    className="save-button"
                  >
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
