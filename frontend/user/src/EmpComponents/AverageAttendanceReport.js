import React, { useState, useEffect } from 'react';
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
import { Typography, CircularProgress } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AverageAttendanceReport() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch attendance data
        const response = await fetch('http://localhost:3000/api/school/attendance-data');
        const { data } = await response.json();

        // Process attendance data
        const attendanceByGrade = {};
        const today = new Date().toLocaleDateString('en-US'); // Adjust format if needed

        data.forEach((entry) => {
          const { grade, date } = entry;

          if (!attendanceByGrade[grade]) {
            attendanceByGrade[grade] = { present: 0, total: 0 };
          }

          // Increment total students in the grade
          attendanceByGrade[grade].total += 1;

          // Increment present count if the date matches today
          if (date === today) {
            attendanceByGrade[grade].present += 1;
          }
        });

        // Prepare data for the chart
        const grades = Object.keys(attendanceByGrade);
        const presentData = grades.map((grade) => attendanceByGrade[grade].present);
        const absentData = grades.map(
          (grade) => attendanceByGrade[grade].total - attendanceByGrade[grade].present
        );

        setChartData({
          labels: grades.map((grade) => `Grade ${grade}`),
          datasets: [
            {
              label: 'Present',
              data: presentData,
              backgroundColor: 'brown',
            },
            {
              label: 'Absent',
              data: absentData,
              backgroundColor: 'salmon',
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {/* <Typography variant="h4" gutterBottom>
        Average Attendance Report
      </Typography> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
