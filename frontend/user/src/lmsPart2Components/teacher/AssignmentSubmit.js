import React from 'react';
import { useParams } from 'react-router-dom';
import './AssignmentSubmit.css';

const AssignmentSubmit = () => {
  const { id } = useParams(); // Extract assignment ID from URL

  return (
    <div className="assignment-submit">
      <h1>Submit Assignment</h1>
      <p>Assignment ID: {id}</p>
      <form>
        <label>
          Upload File:
          <input type="file" />
        </label>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AssignmentSubmit;
