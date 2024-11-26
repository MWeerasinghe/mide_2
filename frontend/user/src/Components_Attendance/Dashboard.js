import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import GridViewIcon from '@mui/icons-material/GridView';

const Dashboard = () => {
  // States to hold the data
  const [studentCount, setStudentCount] = useState(0);
  const [classes, setClasses] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [terms, setTerms] = useState(0);

  // Simulating the API data
  useEffect(() => {
    // Replace these with real API calls when your backend is ready
    setStudentCount(500); // Example: 500 students
    setClasses(12); // Example: 20 classes
    setAttendanceCount(450); // Example: 450 students attended today
    setTeachersCount(25); // Example: 25 teachers
    setTerms(3); // Example: 4 terms in the year
  }, []);

  return (
    <Grid container spacing={3}>
      {/* Box 1: Student Count */}
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

      {/* Box 2: Classes */}
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              <SchoolIcon sx={{ marginRight: 1 }} />
              Classes
            </Typography>
            <Typography variant="h4" color="primary">
              {classes}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Box 3: Attendance Count */}
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

      {/* Box 4: Teachers Count */}
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

      {/* Box 5: Terms */}
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
    </Grid>
  );
};

export default Dashboard;