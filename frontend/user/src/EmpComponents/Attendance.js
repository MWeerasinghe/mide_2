import React, { useEffect, useState } from 'react';
import { Button, Stack, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SplitButton from './SplitButton';
import axios from 'axios';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('All Grades'); // State for selected grade
  const [attendanceData, setAttendanceData] = useState([]); // State for API data

  const paginationModel = { page: 0, pageSize: 5 };

  // Columns definition
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'grade', headerName: 'Grade', type: 'number', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'time', headerName: 'Time', width: 170 },
  ];

  // Fetch attendance data from the API
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/school/attendance-data');
        const dataWithIds = response.data.data.map((item, index) => ({
          id: index + 1, // Assign a unique ID
          ...item,
        }));
        setAttendanceData(dataWithIds);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Filter rows based on the selected date and grade
  const filterRows = () => {
    let filteredRows = attendanceData;

    // Filter by date if selected
    if (selectedDate) {
      const dateStr = selectedDate.format('D/M/YYYY'); // Match API date format
      filteredRows = filteredRows.filter(row => row.date === dateStr);
    }

    // Filter by grade if not "All Grades"
    if (selectedGrade !== 'All Grades') {
      filteredRows = filteredRows.filter(row => row.grade === selectedGrade);
    }

    return filteredRows;
  };

  return (
    <div>
      {/* Stack for positioning DatePicker and SplitButton side by side */}
      <Stack direction="row" spacing={1} alignItems="center" marginBottom={1}>
        {/* DatePicker component */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <Button {...params} variant="outlined" />}
          />
        </LocalizationProvider>

        {/* SplitButton component */}
        <SplitButton onSelectGrade={setSelectedGrade} />
      </Stack>

      {/* DataGrid table for attendance */}
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filterRows()} // Apply filtering
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
}
