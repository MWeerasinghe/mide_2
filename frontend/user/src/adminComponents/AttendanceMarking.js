import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Button, Paper, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

const Attendance = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [scannerInstance, setScannerInstance] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const openQrScanner = () => {
    setQrDialogOpen(true);
    setTimeout(() => initializeScanner(), 100); // Delay scanner initialization
  };

  const closeQrScanner = () => {
    if (scannerInstance) {
      scannerInstance.clear();
      setScannerInstance(null);
    }
    setQrDialogOpen(false);
  };

  const initializeScanner = () => {
    const scannerId = "qr-reader";

    if (!scannerInstance) {
      const scanner = new Html5QrcodeScanner(scannerId, { fps: 10, qrbox: 250 }, false);

      const handleScanSuccess = async (decodedText) => {
        try {
          console.log(`QR Code content: ${decodedText}`);
          const sriLankaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

          const [date, time] = sriLankaTime.split(", ");
          const payload = {
            user_id: parseInt(decodedText, 10),
            date,
            time: time.slice(0, 5),
          };

          const response = await axios.post("http://localhost:3000/api/attendance/mark", payload);
          setUserDetails(response.data.user);
          alert(`Attendance marked successfully: ${response.data.message}`);

          scanner.clear();
        } catch (error) {
          console.error("Error marking attendance:", error);
          alert("Already marked this student today.");
        }
      };

      const handleScanFailure = (error) => {
        console.warn(`Error scanning QR Code: ${error}`);
      };

      scanner.render(handleScanSuccess, handleScanFailure);
      setScannerInstance(scanner);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", position: "relative", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Current Date: {new Date().toLocaleDateString()}
      </Typography>

      <Paper sx={{ padding: 2, display: "inline-block", marginTop: 2 }}>
        <Typography variant="body1" gutterBottom>
          To mark attendance, please scan the student's QR code.
        </Typography>
        <Button variant="contained" onClick={openQrScanner}>
          Scan QR Code
        </Button>
      </Paper>

      <Dialog open={qrDialogOpen} onClose={closeQrScanner}>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          <div id="qr-reader" style={{ width: "300px" }}></div>
        </DialogContent>
      </Dialog>

      {userDetails && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>Student Details</h2>
          <p><strong>ID:</strong> {userDetails.id}</p>
          <p><strong>Full Name:</strong> {userDetails.full_name}</p>
          <p><strong>Surname:</strong> {userDetails.surname_english}</p>
          <p><strong>Grade:</strong> {userDetails.school_grade}</p>
          <p><strong>Class:</strong> {userDetails.class}</p>
          <p><strong>School:</strong> {userDetails.school}</p>
          <p><strong>Dhamma Grade:</strong> {userDetails.dhamma_grade}</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
