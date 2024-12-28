import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [term, setTerm] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueGrades, setUniqueGrades] = useState([]);
  const [uniqueTerms, setUniqueTerms] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  const subjectMapping = {
    a: "අභිධර්මය",
    b: "බුද්ධ චරිතය",
    p: "පාලි",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user_id = 1;
        const response = await axios.get(`http://localhost:3000/api/teachers/getTeacher`, { params: { user_id } });
        const { data } = response.data;

        const years = [...new Set(data.map((item) => item.year))];
        const grades = [...new Set(data.map((item) => item.grade))];
        const terms = [...new Set(data.map((item) => item.term))];
        const subjects = [...new Set(data.map((item) => item.subject))];

        setUniqueYears(years);
        setUniqueGrades(grades);
        setUniqueTerms(terms);
        setUniqueSubjects(subjects);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const confirmation = window.confirm("Are you sure you want to upload this material?");
    if (!confirmation) return;

    if (!year || !grade || !term || !subject || !file) {
      alert("Please fill all the fields and select a file.");
      return;
    }

    try {
      const user_id = 1;

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("year", year);
      formData.append("grade", grade);
      formData.append("term", term);
      formData.append("subject", subject);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/teachers/uploadMaterials",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        alert(`Material "${file.name}" uploaded successfully!`);
        setYear("");
        setGrade("");
        setTerm("");
        setSubject("");
        setFile(null);
      } else {
        alert("Failed to upload the material. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("An error occurred while uploading the material. Please try again.");
    }
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
              {uniqueYears.map((y) => (
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
              {uniqueGrades.map((g) => (
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
              {uniqueTerms.map((t) => (
                <option key={t} value={t}>
                  {`Term ${t}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select Subject</option>
              {uniqueSubjects.map((s) => (
                <option key={s} value={s}>
                  {subjectMapping[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Upload Material</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} key={file ? file.name : ""} />
          </div>
          <button
            type="button"
            onClick={handleUpload}
            className="upload-button"
            disabled={!year || !grade || !term || !subject || !file}
          >
            Upload Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherDashboard;
