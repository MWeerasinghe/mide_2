import React , { useEffect, useState } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DialogBox from '../DialogBox';


export default function DataTable() 
{
    // _________fetch data handle_________________________________
    const [requestsData, setRequestData] = useState([]);

    const handleFetchData = async () =>
    {
        try
        {
            const fetchData = await axios.get('http://localhost:5005/api/requests');
            if(fetchData.data)
            {
                setRequestData(fetchData.data);
            }
        }
        catch(err)
        {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(()=>
    {
        handleFetchData();
    }, []);


    //__________handle dialog Box___________________________
    const paginationModel = { page: 0, pageSize: 5 };
    const columns = [
        // { field: 'id', headerName: 'Student ID', width: 120 },
        { field: 'name', headerName: 'Name', width: 230 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'nic', headerName: 'NIC', width: 170},
        { field: 'temple', headerName: 'Temple', width: 200 },
        { field: 'date', headerName: 'Registered Date', description: 'This column has a value getter and is not sortable.', sortable: false, width: 170, valueGetter: (value, row) => `${row.date || ''}`},
        { field: 'action', headerName: 'Actions', width: 300,
          renderCell: (params) => (
            <>
            <Stack direction="row" spacing={1}>
              <Button onClick={() => handleReject(params.row.id)} variant="outlined" startIcon={<DeleteIcon />}>Reject</Button>
              <Button onClick={() => handleAccept(params.row.id)} variant="contained" endIcon={<SendIcon />}>Accept</Button>
            </Stack>
            </>
          ),
        },
        // { field: 'status', headerName: 'Current Status', width: 170 },
      ];


  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [dialogAction, setDialogAction] = useState(null);

  const handleAccept = (id) => {
    setDialogContent("Are you sure you want to accept this request?");
    setDialogAction(() => () => confirmAction("Accepted", id));
    setDialogOpen(true);
  };

  const handleReject = (id) => {
    setDialogContent("Are you sure you want to reject this request?");
    setDialogAction(() => () => confirmAction("Rejected", id));
    setDialogOpen(true);
  };

  const confirmAction = async (action, id) => 
  {
    try{
        const response = await axios.put('http://localhost:5005/api/requests-update', { id , action });
        console.log(`Request ${action}ed successfully:`, response.data);
        handleFetchData();
    }
    catch(err)
    {
        console.error(`Error ${action}ing request:`, err);
    }
    finally
    {
        setDialogOpen(false);
    }
  };



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
        rows={requestsData.response}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    </>
  );
}