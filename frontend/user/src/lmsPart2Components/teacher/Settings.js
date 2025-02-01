import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import "./Settings.css";
import getTeacherToken from '../../functions/GetTeacherId';

const Settings = () => {
  const [userData, setUserData] = useState(null); // State for user data
  const [error, setError] = useState(null); // State for errors
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator


  const navigate = useNavigate();
  

  useEffect(() => {
    const user_idx = getTeacherToken(); // Get user ID from the token
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/teachers/getProfileDetails/${user_idx}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile details");
        }
        const result = await response.json();
        if (result.success) {
          setUserData(result.data[0]); // Set user data
        } else {
          throw new Error("Profile data not found");
        }
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };

    fetchProfileDetails();
  }, []);

  const redirectToMainSettings = () => 
  {
    navigate('#');
  };

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error state
  }

  return (
    <div className="settings-page">
      <h1>Profile Preview</h1>
      {userData ? (
        <div className="settings-preview">
          <div className="preview-item">
            <span className="label">Username:</span>
            <span className="value">{userData.name}</span>
          </div>
          <div className="preview-item">
            <span className="label">Email:</span>
            <span className="value">{userData.email}</span>
          </div>
          <div className="preview-item">
            <span className="label">Role:</span>
            <span className="value">Teacher</span>
          </div>
          <div className="preview-item">
            <span className="label">NIC:</span>
            <span className="value">{userData.nic}</span>
          </div>
          <div className="preview-item">
            <span className="label">Address:</span>
            <span className="value">{userData.address}</span>
          </div>
          <div className="preview-item">
            <span className="label">Mobile:</span>
            <span className="value">{userData.mobile}</span>
          </div>
          <div className="preview-item">
            <span className="label">Profile Created At:</span>
            <span className="value">
              {new Date(userData.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="preview-item">
            <span className="label">Profile Updated At:</span>
            <span className="value">
              {new Date(userData.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      ) : (
        <p>No profile details available.</p>
      )}
      <p className="settings-description">
        If you want to change these details, please use the main system.
      </p>
      <div className="settings-button-container">
        <button className="settings-button" onClick={redirectToMainSettings}>
          Go to Main System's Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
