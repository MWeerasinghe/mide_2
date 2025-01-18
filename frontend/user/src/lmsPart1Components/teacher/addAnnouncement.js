import React, { useState } from "react";
import axios from "axios";
import "./Announcement.css"; 

const TeacherAnnouncements = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1];
  const grades = ["6", "7", "8", "9", "10", "11"];
  const subjects = [
    { label: "අභිධර්මය", value: "a" },
    { label: "පාලි", value: "p" },
    { label: "බුද්ධ චරිතය", value: "b" },
  ];

  const [announcementData, setAnnouncementData] = useState({
    year: "",
    grade: "",
    subject: "",
    announcement: "",
    date: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
    user_id: 1,
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    const confirmation = window.confirm("Are you sure you want to upload this material?");
    if (!confirmation) return;
    
    const { year, grade, subject, announcement } = announcementData;

    if(!year || !grade || !subject || !announcement) 
    {
      alert("Please fill in all fields.");
      return;
    }

    try 
    {
      const response = await axios.post("http://localhost:3000/api/teachers/addAnnouncement", announcementData);

      if (response.data.success) 
      {
        alert("Announcement added successfully!");
        setAnnouncementData((prevData) => ({
          ...prevData,
          grade: "",
          subject: "",
          announcement: "",
        }));
      } 
      else 
      {
        alert("Failed to add the announcement.");
      }
    } 
    catch (error) 
    {
      alert("An error occurred while adding the announcement: " + error.message);
    }
  };

  return (
    <div className="announcement-container">
      <h2>Create Announcement</h2>
      <form className="announcement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <select
            id="year"
            name="year"
            value={announcementData.year}
            onChange={handleInputChange}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <select
            id="grade"
            name="grade"
            value={announcementData.grade}
            onChange={handleInputChange}
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            name="subject"
            value={announcementData.subject}
            onChange={handleInputChange}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
        <label htmlFor="announcement">Announcement</label>
        <textarea
            id="announcement"
            name="announcement"
            value={announcementData.announcement}
            onChange={handleInputChange}
            placeholder="Write your announcement here..."
            rows="5" // Number of visible text lines
            cols="154" // Width of the textarea
        ></textarea>
        </div>


        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="text"
            value={announcementData.date}
            readOnly
          />
        </div>

        <button type="submit" className="submit-button">
          Add Announcement
        </button>
      </form>
    </div>
  );
};

export default TeacherAnnouncements;
