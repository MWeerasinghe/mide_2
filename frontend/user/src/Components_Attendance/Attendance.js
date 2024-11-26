import React from 'react';
import { Button, Stack, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SplitButton from './SplitButton';

export default function Attendance() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedGrade, setSelectedGrade] = React.useState('All Grades'); // New state to store the selected grade
  const paginationModel = { page: 0, pageSize: 5 };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'grade', headerName: 'Grade', type: 'number', width: 150 },
    { field: 'date', headerName: 'Date', description: 'This column has a value getter and is not sortable.', sortable: false, width: 150 },
    { field: 'status', headerName: 'Status', width: 170 },
  ];

  const rows = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', grade: 'Grade 1', date: '2024-11-08', status: 'Present' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', grade: 'Grade 2', date: '2024-11-07', status: 'Absent' },
    { id: 3, name: 'Robert Brown', email: 'robertbrown@example.com', grade: 'Grade 1', date: '2024-11-06', status: 'Present' },
    { id: 4, name: 'Emily Davis', email: 'emilydavis@example.com', grade: 'Grade 3', date: '2024-11-05', status: 'Present' },
    { id: 5, name: 'Michael Wilson', email: 'michaelwilson@example.com', grade: 'Grade 4', date: '2024-11-04', status: 'Absent' },
    { id: 6, name: 'Sarah Lee', email: 'sarahlee@example.com', grade: 'Grade 5', date: '2024-11-03', status: 'Present' },
    { id: 7, name: 'Daniel Garcia', email: 'danielgarcia@example.com', grade: 'Grade 1', date: '2024-11-02', status: 'Present' },
    { id: 8, name: 'Sophia Martinez', email: 'sophiamartinez@example.com', grade: 'Grade 11', date: '2024-11-01', status: 'Absent' },
    { id: 9, name: 'David Anderson', email: 'davidanderson@example.com', grade: 'Grade 10', date: '2024-10-31', status: 'Present' },
    { id: 10, name: 'Emma Thompson', email: 'emmathompson@example.com', grade: 'Grade 9', date: '2024-10-30', status: 'Present' },
  ];

  // Filter rows based on the selected date and grade
  const filterRows = () => {
    let filteredRows = rows;

    // Filter by date if selected
    if (selectedDate) {
      const dateStr = selectedDate.format('YYYY-MM-DD');
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
          rows={filterRows()}  // Apply filtering
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