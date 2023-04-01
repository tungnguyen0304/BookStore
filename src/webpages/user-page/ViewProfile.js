import { Grid, FormControl, TextField, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { GreenButton, RedButton } from '../button-theme/ButtonTheme';
import ConfirmDialog from '../ConfirmDialog';
import { useNavigate } from 'react-router-dom';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const ViewProfile = () => {
  const [Profile] = useState({
    name: 'John Doe',
    username: 'JohnDude',
    address: 'abcxxxxxxx',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  });

  return (
    <div>
      <div className='pageTitle'>Hồ sơ của bạn</div>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>{Profile.username}</TableCell>
          </TableRow>          
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>{Profile.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{Profile.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SĐT</TableCell>
            <TableCell>{Profile.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>{Profile.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      
    </div>
  );
};

export default ViewProfile;
