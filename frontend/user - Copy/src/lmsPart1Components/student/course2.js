import React, { useState } from 'react';

const FirstCourse = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4, currentYear - 5];

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const courseData = {
    [currentYear]: {
      results: {
        Term1: 'A',
        Term2: 'B+',
        Term3: 'A-',
      },
      attendance: {
        Term1: '90%',
        Term2: '85%',
        Term3: '92%',
      },
      materials: {
        Term1: [
          { name: 'Lecture Notes Week 1', type: 'pdf', link: '/materials/week1.pdf' },
          { name: 'Assignment 1', type: 'link', link: 'https://example.com/assignment1' },
        ],
        Term2: [
          { name: 'Lecture Notes Week 5', type: 'pdf', link: '/materials/week5.pdf' },
        ],
        Term3: [
          { name: 'Final Exam Guide', type: 'link', link: 'https://example.com/exam-guide' },
        ],
      },
    },
    [currentYear - 1]: {
      results: {
        Term1: 'B+',
        Term2: 'A',
        Term3: 'A-',
      },
      attendance: {
        Term1: '88%',
        Term2: '90%',
        Term3: '93%',
      },
      materials: {
        Term1: [
          { name: 'Lecture Notes Week 2', type: 'pdf', link: '/materials/week2.pdf' },
        ],
        Term2: [
          { name: 'Project Guidelines', type: 'link', link: 'https://example.com/project' },
        ],
        Term3: [
          { name: 'Research Paper', type: 'pdf', link: '/materials/research.pdf' },
        ],
      },
    },
  };

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const selectedYearData = courseData[selectedYear] || {
    results: {},
    attendance: {},
    materials: {},
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <h1 style={{ textAlign: 'center', color: '#00008B', marginBottom: '20px' }}>
      අභිධර්මය - Results and Materials
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
      </div>

      {/* Results and Attendance */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
        {/* Results Section */}
        <div style={{ flex: 1, marginRight: '20px', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center', color: '#2980b9' }}>Results</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(selectedYearData.results).map(([term, grade]) => (
              <li key={term} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <strong>{term}</strong>: {grade}
              </li>
            ))}
          </ul>
        </div>

        {/* Attendance Section */}
        <div style={{ flex: 1, marginLeft: '20px', padding: '15px', backgroundColor: '#ecf0f1', borderRadius: '8px' }}>
          <h2 style={{ textAlign: 'center', color: '#27ae60' }}>Attendance</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(selectedYearData.attendance).map(([term, attendance]) => (
              <li key={term} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
                <strong>{term}</strong>: {attendance}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Materials */}
      <div style={{ padding: '15px', backgroundColor: '#f7f9fa', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', color: '#8e44ad' }}>Course Materials</h2>
        {Object.entries(selectedYearData.materials).map(([term, materials]) => (
          <div key={term} style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#2c3e50', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>{term}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {materials.map((material, index) => (
                <li
                  key={index}
                  style={{ padding: '8px 0', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}
                >
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3498db', textDecoration: 'none', marginRight: '10px' }}
                  >
                    {material.name}
                  </a>
                  <span style={{ color: '#7f8c8d', fontSize: '14px' }}>({material.type.toUpperCase()})</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstCourse;
