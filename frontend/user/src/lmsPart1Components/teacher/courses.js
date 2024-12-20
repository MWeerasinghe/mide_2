import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [term, setTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const years = ["2023", "2024"];
  const grades = ["6", "7", "8", "9", "10", "11"];
  const terms = ["1st Term", "2nd Term", "3rd Term"];
  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!year || !grade || !term || !subject || !file) {
      alert("Please fill all the fields and select a file.");
      return;
    }

    // Simulate an upload process
    console.log("Uploading material...");
    console.log({
      year,
      grade,
      term,
      subject,
      fileName: file.name,
    });

    alert(`Material "${file.name}" uploaded successfully!`);
    setFile(null); // Clear the file input after upload
  };

  return (
    <div className="dashboard-container">
      <div className="content">
        <h2>Upload Lecture Materials</h2>
        <form className="upload-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label>Term</label>
            <select value={term} onChange={(e) => setTerm(e.target.value)}>
              <option value="">Select Term</option>
              {terms.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <label>Upload Material</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>
          <button type="button" onClick={handleUpload} className="upload-button">
            Upload Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherDashboard;
