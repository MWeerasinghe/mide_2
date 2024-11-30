import React, {useState, useRef , useEffect} from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCode from "react-qr-code";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import getUserIdFromToken from '../functions/GetUserId';


function QrGenerator() 
{

  //_______________fetch user data__________________________________________
  const [profile, setProfile] = useState({ name: '', email: '', photo: '' });
  const [UserID, setText] = useState('');

  useEffect(() => 
  {
      const fetchProfile = async () => 
      {
        try 
        {
          const token = localStorage.getItem('vajira_token');
          const id = getUserIdFromToken();
          const idAsString = String(id);
          if(!id) 
          {
            window.alert('Please login first');
            return <Navigate to="/" />;
          } 
          
          const response = await axios.get(`http://localhost:3000/api/user/user/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
          setProfile({ name: response.data.data.user.name, email: response.data.data.user.email});
          setText(`${idAsString}, ${response.data.data.user.email}`);
        } 
        catch(error) 
        {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchProfile();
    }, []);



  const svgRef = useRef(null);


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
    <div className='qrScanner' style={{ marginLeft: '-30%', flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        <h1>download your QR code</h1>
        <div ref={svgRef}  className='qr-container' style={{ backgroundColor: 'grey', padding: '10px', borderRadius: '0px', width: 'auto', display: 'inline-block'}}>
          <QRCode value={UserID} />
          {console.log(UserID)}
        </div>
        <div className='input-here' style={{flexDirection: 'column', display: 'flex'}}>
          <Button onClick={downloadQRCode} variant="contained" disableElevation style={{ marginTop: '10px' }}>Download QR</Button>
        </div>
    </div>
  )
}

export default QrGenerator