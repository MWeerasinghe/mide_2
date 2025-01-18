import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FirstCourse = () => {
  const [studeData, setStuData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();
  const sub = 'b';


  // Dummy Data for Course Materials
  const dummyMaterials = {
    2024: {
      term1: ['Introduction to Buddhism.pdf', 'Chapter 1 Notes.docx'],
      term2: ['Buddhist Ethics.ppt', 'Term 2 Exercises.pdf'],
      term3: ['Meditation Techniques.pdf', 'Final Term Notes.docx'],
    },
    2023: {
      term1: ['Historical Overview.pdf', 'Lecture 1.docx'],
      term2: ['Buddhism and Modern Society.ppt', 'Case Studies.pdf'],
      term3: ['Advanced Topics.pdf', 'Group Discussion Notes.docx'],
    },
    2022: {
      term1: ['Term 1 Guide.pdf', 'Lecture Notes 1.pdf'],
      term2: ['Ethics Casebook.pdf', 'Reflection Activities.docx'],
      term3: ['Exam Preparation.pdf', 'Final Term Summary.ppt'],
    },
    2021: {
      term1: ['Basic Principles.pdf', 'Term 1 Assignments.docx'],
      term2: ['Discussion Topics.pdf', 'Group Work Notes.pdf'],
      term3: ['End of Year Review.pdf', 'Final Term Recap.docx'],
    },
  };

  useEffect(() => {
    const fetchBuddhaDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const { user_id, role } = JSON.parse(token);
        if (role === 'student') {
          try {
            const result = await axios.get(`http://localhost:3000/api/students/getBuddhaDetails/${user_id}`);
            setStuData(result.data.data);
          } 
          catch (error) {
            console.error('Error fetching Buddha details:', error);
          }
        }
      }
    };
    fetchBuddhaDetails();
  }, []);



  useEffect(() => {
    const fetchMaterials = async () => {
      if (studeData.length > 0 && selectedYear) {
        const grade = studeData[0].grade;
        const year = selectedYear.toString();
        const subject = sub;

        try {
          const result = await axios.post('http://localhost:3000/api/students/getMaterials', { year, grade, subject });
          if (result.data.success === true) {
            setMaterials(result.data.data);
            console.log('Fetched materials:', result.data.data);
          } else {
            console.log('No data found:', result.data.message);
          }
        } catch (error) {
          if (error.response) {
            console.log('Error response:', error.response.data.message || 'Unknown error occurred');
          } else if (error.request) {
            console.log('No response received:', error.request);
          } else {
            console.log('Error during request setup:', error.message);
          }
        }
      }
    };
    fetchMaterials();
  }, [studeData, selectedYear]);
  
  
  
  

  
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4, currentYear - 5];

  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

  // Find data for the selected year
  const selectedYearData = studeData.find((data) => data.year === selectedYear) || null;


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#00008B', marginBottom: '20px' }}>
        බුද්ධ චරිතය - Buddha's character
      </h1>

      {/* Academic Year Dropdown */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <label htmlFor="year-select" style={{ fontSize: '18px', marginRight: '10px' }}>
          Select Academic Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="abc" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <h4 style={{ margin: 0 }}>Grade: {selectedYearData !== null ? selectedYearData.grade : 'N/A'}</h4>

          {/* Button to Fetch Announcements */}
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#27ae60')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#2ecc71')}
            onClick={() =>
              navigate('/lms/announcements', {
                state: { selectedYear, studeData, sub }, // Pass data as state
              })
            }
          >
            Get Announcements
          </button>

        </div>

      </div>




      {/* Results and Attendance */}
      {selectedYearData ? (
        <div>
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
            {/* Results Section */}
            <div
              style={{
                flex: 1,
                marginRight: '20px',
                padding: '15px',
                backgroundColor: '#ecf0f1',
                borderRadius: '8px',
              }}
            >
              <h2 style={{ textAlign: 'center', color: '#2980b9' }}>Results</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Term 1: {selectedYearData.t1_result}</li>
                <li>Term 2: {selectedYearData.t2_result}</li>
                <li>Term 3: {selectedYearData.t3_result}</li>
              </ul>
            </div>

            {/* Attendance Section */}
            <div
              style={{
                flex: 1,
                marginLeft: '20px',
                padding: '15px',
                backgroundColor: '#ecf0f1',
                borderRadius: '8px',
              }}
            >
              <h2 style={{ textAlign: 'center', color: '#27ae60' }}>Attendance</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>Term 1: {selectedYearData.t1_attend}%</li>
                <li>Term 2: {selectedYearData.t2_attend}%</li>
                <li>Term 3: {selectedYearData.t3_attend}%</li>
              </ul>
            </div>
          </div>

         {/* Course Materials */}
        <div
          style={{
            padding: '20px',
            backgroundColor: '#f9f9fc',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '20px 0',
          }}
        >
          <h2 style={{ textAlign: 'center', color: '#6c5ce7', fontSize: '24px', marginBottom: '20px' }}>
              Course Materials
          </h2>
            {materials.length > 0 ? (
              ['Term 1', 'Term 2', 'Term 3'].map((term) => (
                <div key={term} style={{ marginBottom: '30px' }}>
                  <h2
                    style={{
                      color: '#2d3436',
                      fontSize: '20px',
                      borderBottom: '3px solid #b2bec3',
                      paddingBottom: '8px',
                      marginBottom: '15px',
                    }}
                  >
                    {term}
                  </h2>
                  {materials
                    .filter((material) => `Term ${material.term}` === term)
                    .map((material) => {
                      const fileType = material.note.split('.').pop().toUpperCase();
                      return (
                        <div key={material.id} style={{ marginBottom: '15px' }}>
                          <a
                            href={`http://localhost:3000/api/teachers/openpdf/${encodeURIComponent(material.note)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#0984e3',
                              textDecoration: 'none',
                              fontWeight: '500',
                              fontSize: '16px',
                            }}
                          >
                            {material.note} ({fileType})
                          </a>
                        </div>
                      );
                    })
                    }
                  </div>
                ))
              ) : (
              <p style={{ textAlign: 'center', color: '#636e72' }}>No materials available for the selected year.</p>
            )}

          </div>

        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'red' }}>No data available for the selected year.</p>
      )}
    </div>
  );
};

export default FirstCourse;
