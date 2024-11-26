import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QrScannerPopup({ onScanSuccess, onClose }) {
  useEffect(() => {
    // Initialize the QR Code scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader", 
      { fps: 10, qrbox: 250 }, 
      false
    );

    // Render the scanner and set up the success and error callbacks
    scanner.render(
      (decodedText, decodedResult) => {
        console.log(`QR Code detected: ${decodedText}`);
        onScanSuccess(decodedText);  // Call the success callback prop
      },
      (error) => {
        console.warn(`Error scanning QR Code: ${error}`);
      }
    );

    // Clean up the scanner when the component unmounts
    return () => scanner.clear();
  }, [onScanSuccess]);

  return (
    <div id="qr-reader" style={{ width: '100%' }} />
  );
}