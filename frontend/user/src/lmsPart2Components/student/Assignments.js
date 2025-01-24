import React from "react";
import { useNavigate } from "react-router-dom";
import "./Assignments.css";

const Assignments = () => {
  const navigate = useNavigate();

  const assignments = [
    { id: 1, name: "Math Assignment 1", course: "Mathematics", dueDate: "2024-12-30" },
    { id: 2, name: "Physics Assignment 2", course: "Physics", dueDate: "2024-12-31" },
    { id: 3, name: "English Essay", course: "English", dueDate: "2025-01-01" },
  ];

  const handleSubmitRedirect = (id) => {
    // Navigate to the Assignment Submit page with the assignment ID
    // navigate(`/assignments/${id}/submit`);
    navigate(`/lmsPart1/assignmentSubmit`);
  };

  return (
    <div className="assignments-container">
      <h1>Assignments</h1>
      <table className="assignments-table">
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Course</th>
            <th>Due Date</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.name}</td>
              <td>{assignment.course}</td>
              <td>{assignment.dueDate}</td>
              <td>
                <button
                  className="submit-button"
                  onClick={() => handleSubmitRedirect(assignment.id)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
