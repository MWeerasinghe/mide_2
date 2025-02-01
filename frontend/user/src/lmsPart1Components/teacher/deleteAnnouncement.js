import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnnouncementManager.css';

export default function AnnouncementManager() {
  const [announcements, setAnnouncements] = useState([]);
  const [filters, setFilters] = useState({
    user_id: '5', // Modify as per your logic
    year: '',
    grade: '',
    subject: ''
  });

  const [years, setYears] = useState([2025, 2024]); // Add your dynamic year data
  const [grades, setGrades] = useState([6, 7, 8, 9, 10, 11]); // Updated grades
  const [subjects, setSubjects] = useState([
    { name: 'පාලි', value: 'p' },
    { name: 'බුද්ධ චරිතය', value: 'b' },
    { name: 'අභිධර්මය', value: 'a' }
  ]); // Updated subjects with Sinhala names and values

  // Update form state
  const [updateForm, setUpdateForm] = useState({
    id: '',
    year: '',
    grade: '',
    subject: '',
    announce: '',
    date: ''
  });

  // Fetch announcements when the filters change
  useEffect(() => {
    setAnnouncements([]); // Reset before fetching new data
    
    if (filters.year && filters.grade && filters.subject) {
      axios.post('http://localhost:3000/api/teachers/getAnnounceById', filters)
        .then(response => {
          if (response.data.success) {
            setAnnouncements(response.data.data);
          } else {
            setAnnouncements([]); // In case no data is returned, reset the announcements
          }
        })
        .catch(error => {
          console.error('Error fetching announcements:', error);
        });
    }
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Handle Update Form Changes
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Handle Delete Announcement with Confirmation
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this announcement?");
    if (confirmed) {
      axios.post('http://localhost:3000/api/teachers/deleteAnnounceById', { id })
        .then(response => {
          if (response.data.success) {
            alert(response.data.message);
            setAnnouncements(announcements.filter(announce => announce.id !== id)); // Remove deleted announcement
          }
        })
        .catch(error => {
          console.error('Error deleting announcement:', error);
        });
    }
  };

  // Handle Update Announcement with Confirmation
  const handleUpdate = () => {
    const confirmed = window.confirm("Are you sure you want to update this announcement?");
    if (confirmed) {
      axios.post('http://localhost:3000/api/teachers/updateAnnounceById', updateForm)
        .then(response => {
          if (response.data.success) {
            alert(response.data.message);
            setAnnouncements(announcements.map((announce) => {
              return announce.id === updateForm.id ? updateForm : announce;
            })); // Update the announcement in the list
          }
        })
        .catch(error => {
          console.error('Error updating announcement:', error);
        });
    }
  };

  // Set the update form with the selected announcement data
  const handleEdit = (announce) => {
    setUpdateForm({
      id: announce.id,
      year: announce.year,
      grade: announce.grade,
      subject: announce.subject,
      announce: announce.announce,
      date: announce.date
    });
  };

  // Hide the update form if no announcement is selected
  const showUpdateForm = updateForm.id !== '';

  return (
    <div className="announcement-manager">
      <h2>Announcement Manager</h2>

      {/* Filters for Year, Grade, and Subject */}
      <div className="filters">
        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          name="grade"
          value={filters.grade}
          onChange={handleFilterChange}
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>

        <select
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>{subject.name}</option>
          ))}
        </select>
      </div>

      {/* Table to display announcements */}
      <table className="announcement-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Year</th>
            <th>Grade</th>
            <th>Subject</th>
            <th>Announcement</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements.length > 0 ? (
            announcements.map(announce => (
              <tr key={announce.id}>
                <td>{announce.id}</td>
                <td>{announce.user_id}</td>
                <td>{announce.year}</td>
                <td>{announce.grade}</td>
                <td>{announce.subject}</td>
                <td>{announce.announce}</td>
                <td>{announce.date}</td>
                <td>
                  <button onClick={() => handleEdit(announce)}>Edit</button>
                  <button onClick={() => handleDelete(announce.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No announcements found for the selected filters.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Announcement Form */}
      {showUpdateForm && (
        <div className="update-form">
          <h3>Update Announcement</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="announce"
              value={updateForm.announce}
              onChange={handleUpdateFormChange}
              placeholder="Announcement"
            />
            <input
              type="date"
              name="date"
              value={updateForm.date}
              onChange={handleUpdateFormChange}
            />
            <button type="button" onClick={handleUpdate}>Update Announcement</button>
          </form>
        </div>
      )}
    </div>
  );
}
