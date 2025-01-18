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
        
        // Fetch students data
        const studentResponse = await axios.get('http://localhost:3000/api/school/user/all');
        const totalStudents = studentResponse.data.data.students.length;
        console.log(totalStudents);
        // Fetch attendance data
        const attendanceResponse = await axios.get('http://localhost:3000/api/attendance/user/all');
        const attendanceRecords = attendanceResponse.data.attendance;
        console.log(attendanceResponse);

        // Calculate attendance for today and yesterday
        const today = dayjs().format('YYYY-MM-DD');
        const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

        const calculateAttendance = (date) => {
          const presentStudents = new Set(
            attendanceRecords.filter((record) => record.date === date).map((record) => record.user_id)
          );
          const presentCount = presentStudents.size;
          const absentCount = totalStudents - presentCount;

          return { date, present: presentCount, absent: absentCount };
        };

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
      {/* <Typography variant="h4" gutterBottom>
        Daily Attendance Report
      </Typography> */}
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
