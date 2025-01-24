import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Assignments.css";

const Assignments = () => {
  const navigate = useNavigate();

  const [assignments] = useState([
    { id: 1, name: "Math Assignment 1", course: "Mathematics", dueDate: "2024-12-30" },
    { id: 2, name: "Physics Assignment 2", course: "Physics", dueDate: "2024-12-31" },
    { id: 3, name: "English Essay", course: "English", dueDate: "2025-01-01" },
  ]);

  const submissions = {
    1: [
      { student: "Alice", fileName: "math1.pdf", submittedDate: "2024-12-25" },
      { student: "Bob", fileName: "math1_solution.docx", submittedDate: "2024-12-26" },
    ],
    2: [{ student: "Charlie", fileName: "physics2.pdf", submittedDate: "2024-12-27" }],
    3: [{ student: "Dave", fileName: "english_essay.docx", submittedDate: "2024-12-28" }],
  };

  const [viewingSubmissions, setViewingSubmissions] = useState(null);

  const handleViewSubmissions = (assignmentId) => {
    setViewingSubmissions(assignmentId);
  };

  const handleBackToAssignments = () => {
    setViewingSubmissions(null);
  };

  return (
    <div className="assignments-container">
      {!viewingSubmissions ? (
        <>
          <h1 className="page-title">Published Assignments</h1>
          <div className="assignments-card-container">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="assignment-card">
                <h2 className="assignment-title">{assignment.name}</h2>
                <p className="assignment-course">
                  <strong>Course:</strong> {assignment.course}
                </p>
                <p className="assignment-due-date">
                  <strong>Due Date:</strong> {assignment.dueDate}
                </p>
                <button
                  className="view-submissions-button"
                  onClick={() => handleViewSubmissions(assignment.id)}
                >
                  View Submissions
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="page-title">Submissions for Assignment</h1>
          <button className="back-button" onClick={handleBackToAssignments}>
            Back to Assignments
          </button>
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>File Name</th>
                <th>Submitted Date</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {(submissions[viewingSubmissions] || []).map((submission, index) => (
                <tr key={index}>
                  <td>{submission.student}</td>
                  <td>{submission.fileName}</td>
                  <td>{submission.submittedDate}</td>
                  <td>
                    <a
                      href={`/uploads/${submission.fileName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Assignments;
