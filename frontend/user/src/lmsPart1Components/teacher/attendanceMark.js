import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import "./AttendanceMarking.css";
import getTeacherToken from '../../functions/GetTeacherId';

const AttendanceMarkingWithLock = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];
  const grades = ["6", "7", "8", "9", "10", "11"];
  const subjects = [
    { label: "අභිධර්මය", value: "a" },
    { label: "බුද්ධ චරිතය", value: "b" },
    { label: "පාලි", value: "p" },
  ];
  const navigate = useNavigate();
  const user_idx = getTeacherToken();

  useEffect(() => {
    if (!user_idx) {
      navigate('/signin');
    }
  }, [user_idx, navigate]);
  
  const fetchStudentData = async () => 
  {
    if(!user_idx) 
    {
      navigate("/signin");
    }
    
    if (!year || !grade || !subject) {
      alert("Please select year, grade, and subject.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/teachers/getAllStudentsData",
        {
          params: { year, grade, subject, user_id: 4 },
        }
      );

      if (response.data.success) {
        const studentsData = response.data.data.map((student) => ({
          ...student,
          term1: student.t1_attend,
          term2: student.t2_attend,
          term3: student.t3_attend,
          locks: { term1: true, term2: true, term3: true },
          hasChanged: { term1: false, term2: false, term3: false },
        }));

        setStudents(studentsData);
        setOriginalData(studentsData);
      } else {
        alert("No data found for the selected criteria.");
      }
    } catch (error) {
      alert("An error occurred while fetching student data: " + error.message);
    }
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

  const handleAttendanceChange = (studentId, term, change) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId && !student.hasChanged[term]
          ? {
              ...student,
              [term]: student[term] + change,
              hasChanged: {
                ...student.hasChanged,
                [term]: true,
              },
            }
          : student
      )
    );
  };

  const resetAttendance = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id
          ? {
              ...originalData.find((origStudent) => origStudent.id === id),
              hasChanged: { term1: false, term2: false, term3: false },
            }
          : student
      )
    );
  };

  const saveAttendance = async (id) => {
    const student = students.find((s) => s.id === id);

    try {
      console.log('hhhhh', student.id, subject, student.term1, student.term2, student.term3);
      await axios.post("http://localhost:3000/api/teachers/setStudentAttendance", {
        id: student.id,
        subject: subject,
        term1: student.term1,
        term2: student.term2,
        term3: student.term3,
      });

      alert(`Attendance for ${student.name} saved successfully.`);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id
            ? { ...student, hasChanged: { term1: false, term2: false, term3: false } }
            : student
        )
      );
    } catch (error) {
      alert("An error occurred while saving attendance: " + error.message);
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h2>Mark Attendance</h2>
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
            <button onClick={fetchStudentData} className="fetch-button">
              Find
            </button>
          </div>
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
                  <td key={`${student.id}-${term}`}>
                    <div className="attendance-counter">
                      <button
                        disabled={student.locks[term] || student.hasChanged[term]}
                        onClick={() => handleAttendanceChange(student.id, term, -1)}
                      >
                        -
                      </button>
                      <span>{student[term]}</span>
                      <button
                        disabled={student.locks[term] || student.hasChanged[term]}
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
                  <button onClick={() => resetAttendance(student.id)} className="reset-button">
                    Reset
                  </button>
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