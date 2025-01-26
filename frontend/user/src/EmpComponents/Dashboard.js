import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';
import axios from 'axios';

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [classes, setClasses] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [terms, setTerms] = useState(0);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const schoolResponse = await axios.get('http://localhost:3000/api/school/user/all');
        const students = schoolResponse.data.data.students.length;
        const teachers = schoolResponse.data.data.teachers.length;

        setStudentCount(students);
        setTeachersCount(teachers);

        const attendanceResponse = await axios.get('http://localhost:3000/api/attendance/user/all');
        const attendanceData = attendanceResponse.data.attendance;

        const today = new Date();
        const todayFormatted = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

        const todayAttendance = attendanceData.filter(record => record.date === todayFormatted);
        setAttendanceCount(todayAttendance.length);

        setClasses(12);
        setTerms(3);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const navigateToTeacherLMS = () => {
    window.location.href = 'http://localhost:4001/teacherLmsPart1';
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              <GroupsIcon sx={{ marginRight: 1 }} />
              Total Students
            </Typography>
            <Typography variant="h4" color="primary">
              {studentCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              <EventAvailableIcon sx={{ marginRight: 1 }} />
              Attendance Today
            </Typography>
            <Typography variant="h4" color="primary">
              {attendanceCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              <GroupIcon sx={{ marginRight: 1 }} />
              Total Teachers
            </Typography>
            <Typography variant="h4" color="primary">
              {teachersCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              <GridViewIcon sx={{ marginRight: 1 }} />
              Terms
            </Typography>
            <Typography variant="h4" color="primary">
              {terms}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Teacher LMS
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToTeacherLMS}
              size="large"
              fullWidth
            >
              Go to Teacher LMS
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
