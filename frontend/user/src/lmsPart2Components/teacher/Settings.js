import React from "react";
import "./Settings.css";

const Settings = () => {
  // Mock user data for preview
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Student",
    registrationDate: "January 10, 2023",
    profileStatus: "Active",
  };

  const redirectToMainSettings = () => {
    // Add your redirection logic here
    window.open("https://mainsystem.example.com/settings", "_blank");
  };

  return (
    <div className="settings-page">
      <h1>Profile Preview</h1>
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
          <span className="value">{userData.role}</span>
        </div>
        <div className="preview-item">
          <span className="label">Registration Date:</span>
          <span className="value">{userData.registrationDate}</span>
        </div>
        <div className="preview-item">
          <span className="label">Profile Status:</span>
          <span className="value">{userData.profileStatus}</span>
        </div>
      </div>
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
