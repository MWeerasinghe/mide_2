import React, { useState } from "react";
import { useParams, useLocation  } from "react-router-dom";
import "./AssignmentSubmit.css";
import axios from "axios";
import getUserIdFromToken from '../../functions/GetUserId';


const AssignmentSubmit = () => {
  const location = useLocation();
  const { id } = location.state || {};

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // Track success or error status
console.log('sdfsdfsdfsdf', id);
  const getStudentId = () => "12345"; // Replace with dynamic logic to retrieve student ID

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please upload a file.");
      setIsSuccess(false);
      return;
    }

    const student_id = getUserIdFromToken();

    const formData = new FormData();
    formData.append("user_id", student_id); // Backend expects "user_id"
    formData.append("assign_id", id); // Assignment ID from URL
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/api/students/assignmentUpload", formData, {  headers: { "Content-Type": "multipart/form-data" }});
      console.log('hhhhhhhhhhh', response)
      if (response) 
        {
          console.log('kkk', response);
        setMessage("Assignment submitted successfully!");
        setIsSuccess(true);
      } else {
        const errorResult = await response.json();
        setMessage(
          errorResult.message || "Failed to submit the assignment. Try again."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setMessage("An error occurred while submitting the assignment.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="assignment-submit">
      <h1>Submit Assignment</h1>
      <p>Assignment ID: {id}</p>
      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file">Upload File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmit;
