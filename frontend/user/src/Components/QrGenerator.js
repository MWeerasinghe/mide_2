import React, {useState, useRef , useEffect} from 'react'
import QRCode from "react-qr-code";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function QrGenerator() 
{
  const svgRef = useRef(null);

  const [UserID, setText] = useState('');
  useEffect(() => {
    localStorage.setItem("userId", "2578")
  }, []);

  useEffect(() =>{
    const uid = localStorage.getItem("userId");
    if (uid) 
    {
      console.log("User ID found in localStorage:", uid);
      setText(uid);
    } 
    else 
    {
      console.log("No User ID found in localStorage.");
    }
  }, [])

  // function generatorQR(e)
  // {
  //   setText();
  // }

  // function handleChange(e)
  // {
  //   setText(e.target.value);
  // }

  function downloadQRCode() 
  {
    const svg = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => 
    {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Create a download link
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qr-code.png';
      link.click();
    };

    // Convert SVG data to a base64 URL
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }



  return (
    <div className='qrScanner' style={{ marginLeft: '-50%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        <h1>QR Code Generator</h1>
        <div ref={svgRef}  className='qr-container' style={{ backgroundColor: 'grey', padding: '10px', borderRadius: '0px', width: 'auto', display: 'inline-block'}}>
          <QRCode value={UserID} />
        </div>
        <div className='input-here' style={{flexDirection: 'column', display: 'flex'}}>
          {/* <input type = 'hidden' value={UserID} onChange={(e)=>{handleChange(e)}}/> */}
          {/* <button onClick={downloadQRCode} style={{ marginTop: '10px' }}>Download QR Code</button> */}
          <Button onClick={downloadQRCode} variant="contained" disableElevation style={{ marginTop: '10px' }}>Download QR</Button>
        </div>
    </div>
  )
}

export default QrGenerator