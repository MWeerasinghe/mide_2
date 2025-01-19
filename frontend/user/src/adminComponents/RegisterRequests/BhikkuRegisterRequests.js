import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DialogBox from '../DialogBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function DataTable() {
  const [requestsData, setRequestsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogAction, setDialogAction] = useState(null);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [name, setName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Fetch data
  const handleFetchData = async () => 
  {
    try 
    {
      const response = await axios.get('http://localhost:3000/api/auth/getRegFormTeachers');
      if (response.data && response.data.ifUser) {
        setRequestsData(response.data.ifUser);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleAccept = (id, name, year, email, password, landline, gender, nic, dob, address, mobile) => 
  {
    if (!selectedGrades.length) {
      alert('Please select grades before accepting.');
      return;
    }
    if (!selectedTerm || !selectedSubjects.length) {
      alert('Please select a term and at least one subject before accepting.');
      return;
    }

    setDialogContent('Are you sure you want to accept as a Teacher?');
    setDialogAction(() => () => confirmAction('Accepted', id, name, year, email, password, landline, gender, nic, dob, address, mobile));
    setDialogOpen(true);
  };

  const handleReject = (id, name, year, email, password, landline, gender, nic, dob, address, mobile) => 
  {
    setDialogContent('Are you sure you want to reject this request?');
    setDialogAction(() => () => confirmAction('Rejected', id, name, year, email, password, landline, gender, nic, dob, address, mobile));
    setDialogOpen(true);
  };

  const subjectMap = {
    'Buddha Charithaya': 'b',
    'Abhi Dharmaya': 'a',
    'Pali': 'p',
  };
  
  const termMap = {
    'Term 1': 't1',
    'Term 2': 't2',
    'Term 3': 't3',
  };
  
  const confirmAction = async (action, id, name, year, email, password, landline, gender, nic, dob, address, mobile) => {
    try {
      const role = 'teacher';
      const mappedSubjects = selectedSubjects.map((subject) => subjectMap[subject]);
      const mappedTerm = termMap[selectedTerm];
  
      const response = await axios.post('http://localhost:3000/api/auth/acceptOrRejectRequestTeachers', {
        id,
        action,
        role,
        name,
        year,
        email, 
        password, 
        landline, 
        gender, 
        nic, 
        dob, 
        address, 
        mobile,
        grades: selectedGrades,
        term: mappedTerm,
        subjects: mappedSubjects, // Use plural here to send an array of mapped subjects
      });
  
      console.log('Mapped Subjects:', mappedSubjects);
      console.log(`Request ${action} successfully:`, response.data);
      handleFetchData();
    } catch (err) {
      console.error(`Error ${action} request:`, err);
    } finally {
      setDialogOpen(false);
    }
  };
  
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'year', headerName: 'Academic Year', width: 120 },
    { field: 'grade', headerName: 'Expected Grade', width: 120 },
    { field: 'createdat', headerName: 'Registered Date', width: 170 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Button onClick={() => handleReject(params.row.id, params.row.name, params.row.year,params.row.email, params.row.password, params.row.landline, params.row.gender, params.row.nic, params.row.dob, params.row.address, params.row.mobile)} variant="outlined" startIcon={<DeleteIcon />}>
            Reject
          </Button>
          <Button onClick={() => handleAccept(params.row.id, params.row.name, params.row.year,params.row.email, params.row.password, params.row.landline, params.row.gender, params.row.nic, params.row.dob, params.row.address, params.row.mobile)} variant="contained" endIcon={<SendIcon />}>
            Accept
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <DialogBox
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={dialogAction}
        title="Confirmation"
        content={dialogContent}
      />
      <Stack direction="row" spacing={3} marginBottom={2}>
        <Select
          multiple
          value={selectedGrades}
          onChange={(e) => setSelectedGrades(e.target.value)}
          displayEmpty
          style={{ minWidth: 150 }}
        >
          <MenuItem value="" disabled>
            Select Grades
          </MenuItem>
          {[6, 7, 8, 9, 10, 11].map((grade) => (
            <MenuItem key={grade} value={grade}>
              {grade}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          displayEmpty
          style={{ minWidth: 150 }}
        >
          <MenuItem value="" disabled>
            Select Term
          </MenuItem>
          {['Term 1', 'Term 2', 'Term 3'].map((term) => (
            <MenuItem key={term} value={term}>
              {term}
            </MenuItem>
          ))}
        </Select>
        <Select
          multiple
          value={selectedSubjects}
          onChange={(e) => setSelectedSubjects(e.target.value)}
          displayEmpty
          style={{ minWidth: 150 }}
        >
          <MenuItem value="" disabled>
            Select Subjects
          </MenuItem>
          {['Buddha Charithaya', 'Abhi Dharmaya', 'Pali'].map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={requestsData.map((item) => ({
            id: item.id,
            name: item.name,
            email: item.email,
            year: item.year,
            grade: item.grade,
            createdat: item.createdat,
            password: item.password,
            landline: item.landline,
            gender: item.gender,
            nic: item.nic,
            dob: item.dob,
            address: item.address,
            mobile: item.mobile,
          }))}
          columns={columns}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
