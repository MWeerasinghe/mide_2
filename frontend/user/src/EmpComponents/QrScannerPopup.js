import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const QrScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader", // ID of the div where the scanner will render
      { fps: 10, qrbox: 250 },
      false
    );

    const handleScanSuccess = async (decodedText) => {
      try {
        console.log(`QR Code content: ${decodedText}`);
        const sriLankaTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
        });

        const date = sriLankaTime.split(",")[0]; // Extract date in YYYY-MM-DD format
        const time = sriLankaTime.split(",")[1].trim().substring(0, 5); // Extract time in HH:mm format

        const payload = {
          user_id: parseInt(decodedText, 10), // Convert scanned ID to integer
          date: date, // Example: "2024-12-03"
          time: time, // Example: "16:07"
        };

        console.log("Payload to send:", payload);

        // Send the payload to the REST API
        const response = await axios.post("http://localhost:3000/api/attendance/mark", payload);
        alert(`Attendance marked successfully: ${response.data.message}`);
        scanner.clear(); // Stop the scanner after a successful scan
      } 
      catch (error) {
        console.error("Error marking attendance:", error);
        alert("Already marked this student today.");
      }
    };

    const handleScanFailure = (error) => {
      console.warn(`Error scanning QR Code: ${error}`);
    };

    scanner.render(handleScanSuccess, handleScanFailure);

    return () => {
      scanner.clear(); // Clean up the scanner on unmount
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Scan QR Code</h1>
      <div id="qr-reader" style={{ width: '300px' }}></div>
    </div>
  );
};

export default QrScanner;
