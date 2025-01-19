import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DialogBox from '../DialogBox';

export default function DataTable() {
  const [requestsData, setRequestsData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogAction, setDialogAction] = useState(null);

  // Fetch data
  const handleFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/getRegFormStudents');
      if (response.data && response.data.ifUser) {
        setRequestsData(response.data.ifUser);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // Handle accept/reject
  const handleAccept = (id, name, year, email, password, landline, gender, nic, dob, address, mobile, grade) => {
    setDialogContent("Are you sure you want to accept this student?");
    setDialogAction(() => () => confirmAction("Accepted", id, name, year, email, password, landline, gender, nic, dob, address, mobile, grade));
    setDialogOpen(true);
  };

  const handleReject = (id, name, year, email, password, landline, gender, nic, dob, address, mobile, grade) => {
    setDialogContent("Are you sure you want to reject this student?");
    setDialogAction(() => () => confirmAction("Rejected", id, name, year, email, password, landline, gender, nic, dob, address, mobile, grade));
    setDialogOpen(true);
  };

  const confirmAction = async (action, id, name, year, email, password, landline, gender, nic, dob, address, mobile, grade) => 
  {
    try 
    {
      const role = 'student';
      const response = await axios.post('http://localhost:3000/api/auth/acceptOrRejectRequestStudents', { id, action, role, name, year, email, password, landline, gender, nic, dob, address, mobile, grade });
      console.log(`Request ${action} successfully:`, response.data);
      handleFetchData();
    } catch (err) {
      console.error(`Error ${action} request:`, err);
    } finally {
      setDialogOpen(false);
    }
  };

  // DataGrid columns
  const columns = [
    { field: 'id', headerName: 'Student ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'year', headerName: 'Year', width: 170 },
    { field: 'grade', headerName: 'Grade', width: 170 },
    { field: 'createdat', headerName: 'Registered Date', width: 170 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button onClick={() => handleReject(params.row.id, params.row.name, params.row.year,params.row.email, params.row.password, params.row.landline, params.row.gender, params.row.nic, params.row.dob, params.row.address, params.row.mobile, params.row.grade)} variant="outlined" startIcon={<DeleteIcon />}>
            Reject
          </Button>
          <Button onClick={() => handleAccept(params.row.id, params.row.name, params.row.year,params.row.email, params.row.password, params.row.landline, params.row.gender, params.row.nic, params.row.dob, params.row.address, params.row.mobile, params.row.grade)} variant="contained" endIcon={<SendIcon />}>
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
      <Paper sx={{ height: 400, width: '100%' }}>
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
