import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./HomePage.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  // Data for the pie charts
  const assignmentData = {
    labels: ["Submitted", "Pending"],
    datasets: [
      {
        data: [12, 3], // Example: 12 submitted, 3 pending
        backgroundColor: ["#4caf50", "#f44336"], // Green for submitted, Red for pending
        hoverBackgroundColor: ["#66bb6a", "#e57373"],
      },
    ],
  };

  const attendanceData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [95, 5], // Example: 95% present, 5% absent
        backgroundColor: ["#2196f3", "#ff9800"], // Blue for present, Orange for absent
        hoverBackgroundColor: ["#64b5f6", "#ffb74d"],
      },
    ],
  };

  return (
    <div className="home-page">
      <img src="https://imgs.search.brave.com/YVjhP5r1k8_75P_7gpOTx1z79C6Gp9UPf7iKftnh-rA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9scC1j/bXMtcHJvZHVjdGlv/bi5pbWdpeC5uZXQv/MjAyMS0xMC9Ob3Zp/Y2UlMjBtb25rcyUy/MGZlZWRpbmclMjBt/b25rZXlzJTIwb3V0/c2lkZSUyMHRlbXBs/ZS4lMjBCeSUyMEh1/Z2glMjBTaXR0b24l/MjBTdG9ja3N5X3R4/cDk1YTEyYzE0QjRE/MzAwX01lZGl1bV81/Njk3NjYuanBnP3c9/MTkyMCZoPTY0MCZm/aXQ9Y3JvcCZjcm9w/PWZhY2VzLGVkZ2Vz/JmF1dG89Zm9ybWF0/JnE9NzU" alt="LMS Banner" className="banner" />
      <h1>Welcome to the LMS</h1>
      <p>Track your progress and manage your courses efficiently!</p>

      <div className="indicators">
        <div className="indicator-card">
          <h2>Grade Average</h2>
          <p>A-</p>
        </div>
        <div className="indicator-card">
          <h2>Assignments Submitted</h2>
          <p>12/15</p>
        </div>
        <div className="indicator-card">
          <h2>Attendance</h2>
          <p>95%</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Assignment Submission Ratio</h3>
          <Pie data={assignmentData} />
        </div>
        <div className="chart-card">
          <h3>Attendance Ratio</h3>
          <Pie data={attendanceData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
