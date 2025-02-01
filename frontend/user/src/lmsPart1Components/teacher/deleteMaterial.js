import React, { useState } from "react";
import axios from "axios";
import getUserIdFromToken from '../../functions/GetUserId';
import "./DeleteMaterial.css"; // Import the custom CSS file

export default function DeleteMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [year, setYear] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  // Handle fetch materials
  const fetchMaterials = async () => {
    if (!year || !grade || !subject) {
      alert("Please select year, grade, and subject.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
        const user_id = getUserIdFromToken();
      const response = await axios.post(
        "http://localhost:3000/api/teachers/getMaterialById",
        {
          user_id,
          year,
          grade,
          subject,
        }
      );
      setMaterials(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id, grade) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this material?");
    
    if (isConfirmed) {
      try {
        console.log('Deleting material with id:', id, 'and grade:', grade);
  
        const response = await axios.post("http://localhost:3000/api/teachers/DeleteMaterialById", { id, grade });
  
        alert(response.data.message);
  
        setMaterials((prevMaterials) =>
          prevMaterials.filter((material) => material.id !== id)
        );
      } catch (err) {
        alert("Failed to delete material: " + err.message); // Show error message if deletion fails
      }
    } else {
      console.log("Deletion canceled by user");
    }
  };

  return (
    <div className="delete-material-container">
      <h1 className="title">Manage Materials</h1>

      {/* Selection Filters */}
      <div className="filters">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Year</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>

        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Grade</option>
          <option value="6">Grade 6</option>
          <option value="7">Grade 7</option>
          <option value="8">Grade 8</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Subject</option>
          <option value="p">පාලි</option>
          <option value="b">බුද්ධ චරිතය</option>
          <option value="a">අභිධර්මය</option>
        </select>
      </div>

      <button
        onClick={fetchMaterials}
        className="fetch-button"
      >
        Fetch Materials
      </button>

      {/* Table Section */}
      {loading && <div className="loading-text">Loading...</div>}
      {error && <div className="error-text">Error: {error}</div>}
      {!loading && materials.length > 0 && (
        <div className="table-container">
          <table className="material-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Grade</th>
                <th>Year</th>
                <th>Date</th>
                <th>Term</th>
                <th>Note</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.user_id}</td>
                  <td>{material.grade}</td>
                  <td>{material.year}</td>
                  <td>{material.date}</td>
                  <td>{material.term}</td>
                  <td>{material.note}</td>
                  <td>{material.subject}</td>
                  <td>
                    {/* PDF Preview Link */}
                    {material.note && (
                      <div style={{ marginBottom: '15px' }}>
                        <a
                          href={`http://localhost:3000/api/teachers/openpdf/${encodeURIComponent(
                            material.note
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#0984e3',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '16px',
                          }}
                        >
                          View PDF
                        </a>
                      </div>
                    )}
                    {/* Delete Button */}
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(material.id, material.grade)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
