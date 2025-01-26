import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import dayjs from 'dayjs';

export default function DailyAttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceReport = async () => {
      try {
        setLoading(true);

        // Fetch total students
        const studentResponse = await axios.get('http://localhost:3000/api/school/user/all');
        const totalStudents = studentResponse.data.data.students.length;

        // Fetch attendance data
        const attendanceResponse = await axios.get('http://localhost:3000/api/attendance/user/all');
        const attendanceRecords = attendanceResponse.data.attendance;

        // Dates for today and yesterday
        const today = dayjs().format('M/D/YYYY'); // Adjusted format to match API response
        const yesterday = dayjs().subtract(1, 'day').format('M/D/YYYY');

        // Calculate attendance for a given date
        const calculateAttendance = (date) => {
          const presentStudents = new Set(
            attendanceRecords.filter((record) => record.date === date).map((record) => record.user_id)
          );
          const presentCount = presentStudents.size;
          const absentCount = totalStudents - presentCount;

          return { date, present: presentCount, absent: absentCount };
        };

        // Generate report for today and yesterday
        const reportData = [
          calculateAttendance(today),
          calculateAttendance(yesterday),
        ];

        setAttendanceData(reportData);
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceReport();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div style={{ padding: 20 }}>
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
