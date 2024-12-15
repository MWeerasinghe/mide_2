import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AverageAttendanceReport() {
  // Replace with real data when connecting to the backend
  const chartData = {
    labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'],
    datasets: [
      {
        label: 'Present',
        data: [30, 25, 40, 35],
        backgroundColor: 'brown', // Changed to brown
      },
      {
        label: 'Absent',
        data: [5, 10, 8, 12],
        backgroundColor: 'salmon', // Changed to salmon pink
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Average Attendance by Grade',
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Grades',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Students',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Average Attendance Report
      </Typography>
      <Bar data={chartData} options={options} />
    </div>
  );
}