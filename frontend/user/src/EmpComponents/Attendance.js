import React, { useEffect, useState } from 'react';
import { Stack, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null); // Date selected by the user
  const [selectedGrade, setSelectedGrade] = useState('All Grades'); // Grade selected by the user
  const [attendanceData, setAttendanceData] = useState([]); // All attendance data
  const [filteredData, setFilteredData] = useState([]); // Filtered attendance data

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'grade', headerName: 'Grade', width: 100 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 170 },
  ];

  // Fetch attendance data from API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/school/attendance-data');
        const dataWithIds = response.data.data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        setAttendanceData(dataWithIds); // Save all data
        setFilteredData(dataWithIds); // Initially display all data
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Filter the data whenever selectedDate or selectedGrade changes
  useEffect(() => {
    let filtered = [...attendanceData];

    // Filter by date
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format('D/M/YYYY'); // Format selected date
      filtered = filtered.filter((row) => row.date === formattedDate);
    }

    // Filter by grade
    if (selectedGrade !== 'All Grades') {
      filtered = filtered.filter((row) => row.grade === selectedGrade);
    }

    setFilteredData(filtered);
  }, [selectedDate, selectedGrade, attendanceData]);

  return (
    <div>
      {/* Filters */}
      <Stack direction="row" spacing={2} alignItems="center" marginBottom={2}>
        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </LocalizationProvider>

        {/* Grade Dropdown */}
        <TextField
          select
          label="Select Grade"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="All Grades">All Grades</option>
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </TextField>
      </Stack>

      {/* Data Grid */}
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
