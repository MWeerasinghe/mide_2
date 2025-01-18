import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Announcements = () => {
  const location = useLocation();
  const { selectedYear, studeData, sub } = location.state || {}; // Destructure the passed state
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const x = sub;
  let subName;
  if(x === 'a')
  {
     subName = 'අභිධර්මය';
  }
  else if(x == 'b')
  {
     subName = 'බුද්ධ චරිතය';
  }
  else
  {
     subName = 'පාලි';
  }

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const grade = studeData?.[0]?.grade; // Extract grade
        const response = await axios.get(
          `http://localhost:3000/api/students/getAnnouncements`,
          {
            params: {
              year: selectedYear,
              grade,
              subject: sub,
            },
          }
        );

        if(response.data.success) {
          setAnnouncements(response.data.data);
        } else {
          setError('No any announcements.');
        }
      } catch (err) {
        setError('An error occurred while fetching announcements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [selectedYear, studeData, sub]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Announcements</h1>
        <div className="details">
          <p><strong>Year:</strong> {selectedYear}</p>
          <p><strong>Subject:</strong> {subName}</p>
          <p><strong>Grade:</strong> {studeData?.[0]?.grade}</p>
        </div>
      </header>

      <main>
        <h2>Announcement List</h2>
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          <div className="announcement-list">
            {announcements.map((announcement) => (
              <div className="announcement-card" key={announcement.id}>
                <h4>{announcement.announce}</h4>
                <p><strong>Date:</strong> {announcement.date}</p>
                <p><strong>Teacher's Name:</strong> {announcement.name}</p>
                <p><strong>Teacher's Email:</strong> {announcement.email}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          {/* max-width: 800px; */}
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          {/* background-color: #f9f9f9; */}
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .details {
          display: flex;
          gap: 80px;
        }
        .details p {
          margin: 5px 0;
        }
        .announcement-list {
          display: grid;
          gap: 20px;
        }
        .announcement-card {
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          {/* background-color: #fff; */}
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .announcement-card h4 {
          margin: 0 0 10px;
          color: #f42727
        }
        .announcement-card p {
          margin: 5px 0;
        }

        .loading, .error {
          text-align: center;
          font-size: 18px;
          {/* color: #555; */}
        }
      `}</style>
    </div>
  );
};

export default Announcements;
