import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ViewProfile = () => {
  const [Profile, setProfile] = useState({
    name: 'John Doe',
    Address: 'abcxxxxxxx',
    birthDate: '12/03/2021',
    email: 'john.doe@example.com',
    numberphone: '123-456-7890'
    
  });
  // function handleDateSelect(date) {
  //   console.log(date);
  //   return date;
  // } 
    

     


 
  

  return (
    <div>
      <div className='pageTitle'><h2>ViewProfile </h2></div>
      <table style={{width:"100%",margin:"20px 0"}}>
      <tbody>
        <tr  >
          <td style={{border:"1px solid #000"}}>Name:</td>
          <td style={{border:"1px solid #000"}}>{Profile.name}</td>
        </tr>
        <tr style={{}}>
          <td style={{border:"1px solid #000"}}>Email:</td>
          <td style={{border:"1px solid #000"}}>{Profile.email}</td>
        </tr>
        <tr style={{}}>
          <td style={{border:"1px solid #000"}}>Address:</td>
          <td style={{border:"1px solid #000"}}>{Profile.Address}</td>
        </tr>
        <tr style={{}}>
          <td style={{border:"1px solid #000"}}>Phone:</td>
          <td style={{border:"1px solid #000"}}>{Profile.numberphone}</td>
        </tr>
        <tr style={{}}>
          <td style={{border:"1px solid #000"}}>Date:</td>
          <td style={{border:"1px solid #000"}}>{Profile.birthDate}</td>
        </tr>
        
      </tbody>
    </table>
      
    </div>
  );
};

export default ViewProfile;
