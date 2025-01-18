import React, { useState } from 'react';
import { Button, Paper, Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';
import QrScannerPopup from './QrScannerPopup'; // Import the QR Scanner component

export default function AttendanceMarkingPage() {
  const [qrDialogOpen, setQrDialogOpen] = useState(false); // Control visibility of QR Scanner pop-up
  const [scannedStudent, setScannedStudent] = useState(null); // Store the scanned student details
  const [errorMessage, setErrorMessage] = useState(null); // Store error messages

  // Dummy data for students
  const rows = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', grade: '1', date: '2024-11-10', status: 'Unmarked' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', grade: '2', date: '2024-11-10', status: 'Present' },
  ];

  // Function to find a student by ID (from the QR code)
  const findStudentById = (id) => rows.find(student => student.id === id);

  // Open QR Scanner dialog
  const openQrScanner = () => {
    setQrDialogOpen(true);
    setErrorMessage(null); // Clear any previous error message
  };

  // Close QR Scanner dialog
  const closeQrScanner = () => setQrDialogOpen(false);

  // Handle the result of a successful QR scan
  const handleScanSuccess = (result) => {
    const studentId = parseInt(result); // Assuming the QR code contains the student ID as a number
    const student = findStudentById(studentId);

    if (student) {
      student.status = 'Present'; // Update status
      setScannedStudent(student); // Store the scanned student details
      setErrorMessage(null); // Clear error message if scan is valid
    } else {
      setErrorMessage('Invalid QR code. Please try again.'); // Display error for invalid QR code
      setScannedStudent(null); // Clear previous scanned student details
    }

    // Automatically close the QR scanner pop-up after processing
    setTimeout(() => closeQrScanner(), 1000); // Close dialog after 1 second
  };

  // Refresh the page when the Reset button is clicked
  const handleReset = () => window.location.reload();

  return (
    <div style={{ textAlign: 'center', padding: '20px', position: 'relative', minHeight: '100vh' }}>
      {/* Display Current Date */}
      <Typography variant="h4" component="h1" gutterBottom>
        Current Date: {new Date().toLocaleDateString()}
      </Typography>

      {/* QR Button in a Box with Instructions */}
      <Paper sx={{ padding: 2, display: 'inline-block', marginTop: 2 }}>
        <Typography variant="body1" gutterBottom>
          To mark attendance, please scan the student's QR code.
        </Typography>
        <Button variant="contained" onClick={openQrScanner}>
          Scan QR Code
        </Button>
      </Paper>

      {/* QR Scanner pop-up */}
      <Dialog open={qrDialogOpen} onClose={closeQrScanner}>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          <QrScannerPopup onScanSuccess={handleScanSuccess} />
        </DialogContent>
      </Dialog>

      {/* Display scanned student details */}
      {scannedStudent && (
        <Paper sx={{ marginTop: 2, padding: 2 }}>
          <Typography variant="h6">Scanned Student Details:</Typography>
          <Typography>Name: {scannedStudent.name}</Typography>
          <Typography>Email: {scannedStudent.email}</Typography>
          <Typography>Grade: {scannedStudent.grade}</Typography>
          <Typography>Status: {scannedStudent.status}</Typography>
          <Typography color="green">Status updated to Present.</Typography>
        </Paper>
      )}

      {/* Display error message for invalid QR codes */}
      {errorMessage && (
        <Paper sx={{ marginTop: 2, padding: 2, backgroundColor: '#f8d7da' }}>
          <Typography color="error">{errorMessage}</Typography>
        </Paper>
      )}

      {/* Reset Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleReset}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '10px 20px',
        }}
      >
        Reset
      </Button>
    </div>
  );
}