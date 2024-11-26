import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function DailyAttendanceReport() {
  // Replace with real data when connecting to the backend
  const attendanceData = [
    { date: '2024-11-19', present: 45, absent: 5 },
    { date: '2024-11-18', present: 40, absent: 10 },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Daily Attendance Report
      </Typography>
      {attendanceData.map((record, index) => (
        <Paper key={index} style={{ margin: '10px 0', padding: 15 }}>
          <Typography variant="h6">Date: {record.date}</Typography>
          <Typography>Present: {record.present}</Typography>
          <Typography>Absent: {record.absent}</Typography>
        </Paper>
      ))}
    </div>
  );
}