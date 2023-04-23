import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import Meta from '../../components/Meta';


const ViewProfile = () => {
  const [Profile, setProfile] = useState({
    name: '',
    username: '',
    address: '',
    email: '',
    phone: ''
  });

  // fecth user info
  useEffect(() => {
    axios.get('http://localhost/api/user-info.php')
    .then(response => {
      return response.data
    })
    .then(response => {
        setProfile(response)
    }) 
    .catch(error => {
      console.log(error);
    });    
  }, [])  

  return (
    <div>
      <Meta title="Hồ sơ của bạn"/>
      <div className='h3'>Hồ sơ của bạn</div>
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
