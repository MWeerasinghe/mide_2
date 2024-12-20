import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FirstCourse = () => {
  const [studeData, setStuData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [materials, setMaterials] = useState([]);


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
    const fetchLectures = async () => {
      if (studeData.length > 0 && selectedYear) 
      {
        const year1 = selectedYear;
        const grade1 = studeData[0].grade
        const year = "2028";
        const grade = "6";
        const subject = "b";
  
        console.log("Fetching materials for year:", year, "Grade:", grade, "Subject:", subject);
  
        try 
        {
          console.log("before");
          const result = await axios.post("http://localhost:3000/api/students/getMaterials", { year, grade, subject });
          console.log("after", result);

          if(result) 
          {
            setMaterials(result.data.data);
            console.log("Fetched materials:", result.data.data);
          } 
          else 
          {
            console.error("Failed to fetch materials: Invalid response format");
          }
        } 
        catch (error) 
        {
          console.error("Error fetching materials:", error);
        }
      } 
      else 
      {
        console.log("Data is not available yet. studeData or selectedYear is missing.");
      }
    };
  
    fetchLectures();
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
        <h4>Grade: {selectedYearData !== null ? selectedYearData.grade : 'N/A'}</h4>
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
          {dummyMaterials[selectedYear] ? (
            Object.entries(dummyMaterials[selectedYear]).map(([term, materials], index) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <h3
                  style={{
                    color: '#2d3436',
                    fontSize: '18px',
                    borderBottom: '2px solid #dfe6e9',
                    paddingBottom: '5px',
                    marginBottom: '10px',
                  }}
                >
                  {term.replace(/term/i, 'Term ')}:
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {materials.map((material, i) => (
                    <li
                      key={i}
                      style={{
                        padding: '8px 0',
                        borderBottom: '1px solid #dfe6e9',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <a href="#"
                        style={{
                          color: '#0984e3',
                          textDecoration: 'none',
                          fontWeight: '500',
                          fontSize: '16px',
                          marginRight: '10px',
                        }}
                      >
                        {material}
                      </a>
                      <span style={{ color: '#636e72', fontSize: '14px' }}>(PDF)</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#b2bec3', fontSize: '16px' }}>
              No course materials available for {selectedYear}.
            </p>
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
