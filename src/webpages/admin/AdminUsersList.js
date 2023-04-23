import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination} from '@mui/material';
import { Delete, Reviews } from '@mui/icons-material';
import AlertDialog from '../AlertDialog';
import ConfirmDialog from '../ConfirmDialog';
import NormalSearchBar from '../search-bar/NormalSearchBar';

const UsersAdminPage = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [users, setUsers] = useState([])  
    // search bar
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    axios.get('http://localhost/api/admin/users-list.php')
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
      setUsers(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }, [])
  // get from servers, not by users array
  const pageCount = Math.ceil(users.length / rowsPerPage);  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // fecth new data based on page
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // view user popup
  const [viewUserPopup, setView] = useState(false)
  const onViewDetail = (user) => {
    setView(user)
  }
  const [confirmDel, setConfirmDel] = useState(false)
  const onDelete = (ID) => {
    setUsers(users.filter(user => user.ID !== ID))
    // delete in server
  }    
  
  const handleSearch = () => {
    axios.get('http://localhost/api/admin/users-list.php', {
      params: {
        q: searchText.trim()
      }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
        setUsers(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }  

  return (
    <>
    <Grid container sx={{ mb: 1, mt: 1 }}>
      <Grid item xs={12} sm={8} md={6}>
        <div className='pageTitle'>Quản lý người dùng</div>
      </Grid>
      <Grid item xs={12} sm={4} md={6}>
        <NormalSearchBar 
        label="Nhập thông tin cần tìm" 
        searchText={searchText} 
        setSearchText={setSearchText} 
        handleSearch={handleSearch}
        />
      </Grid>      
    </Grid>    
    <Box>
      <Table aria-label="users table" className='admin-table'>
        <TableHead>
          <TableRow key="header-row">
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell width="150px">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {currentUsers.map((user) => (
            <TableRow key={user.ID}>
              <TableCell scope="row">
                {user.ID}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Tooltip title="Xem chi tiết">
                  <IconButton color="secondary" onClick={() => onViewDetail(user)}>
                    <Reviews />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa người dùng">
                  <IconButton color="secondary" onClick={() => setConfirmDel(user.ID)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination color="primary" count={pageCount} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Box>
    <AlertDialog title="Thông tin người dùng" open={!!viewUserPopup} setView={setView}>
      <>
        <Table>
            <TableBody>
            <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{viewUserPopup.ID}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Tên</TableCell>
                <TableCell>{viewUserPopup.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Username</TableCell>
                <TableCell>{viewUserPopup.username}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Quyền</TableCell>
                <TableCell>{viewUserPopup.role == 0 ? "User" : "Admin"}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">SĐT</TableCell>
                <TableCell>{viewUserPopup.phone}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Email</TableCell>
                <TableCell>{viewUserPopup.email}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Địa chỉ</TableCell>
                <TableCell>{viewUserPopup.address}</TableCell>
            </TableRow>     
            </TableBody>                                                                   
        </Table>     
      </>
    </AlertDialog>
    <ConfirmDialog 
      isOpen={!!confirmDel} 
      setOpen={setConfirmDel} 
      content={"Bạn có chắc chắn muốn xóa user có ID = " + confirmDel + " không?"}
      confirm={() => onDelete(confirmDel)}
    />
    </>
  );
};


export default UsersAdminPage;
