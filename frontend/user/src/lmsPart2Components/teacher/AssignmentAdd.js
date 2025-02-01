import React, { useState } from "react";
import "./AssignmentAdd.css";

const AssignmentAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    if (!formData.name || !formData.course || !formData.dueDate) {
      setError("All fields are required.");
      return;
    }
    if (formData.dueDate < today) {
      setError("Due date cannot be a past date.");
      return;
    }

    setError(""); // Clear any previous error

    // Make the API call to the backend
    try {
      const response = await fetch("http://localhost:3000/api/teachers/addAssignment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the backend knows we're sending JSON
        },
        body: JSON.stringify({
          name: formData.name,
          course: formData.course,
          due_date: formData.dueDate,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Handle success response
        console.log("Assignment added successfully:", result);
        // You can reset the form or display a success message here
        setFormData({
          name: "",
          course: "",
          dueDate: "",
        });
      } else {
        // Handle error response from backend
        setError(result.message || "Something went wrong.");
      }
    } catch (error) {
      // Handle network or other errors
      setError("Failed to submit assignment. Please try again.");
    }
  };

  return (
    <div className="add-assignment-container">
      <h1>Add New Assignment</h1>
      <form className="add-assignment-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">Assignment Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            <option value="බුද්ධ චරිතය">බුද්ධ චරිතය</option>
            <option value="අභිධර්මය">අභිධර්මය</option>
            <option value="පාලි">පාලි</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentAdd;
