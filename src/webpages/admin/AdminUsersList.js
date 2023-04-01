import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination} from '@mui/material';
import { Delete, Reviews } from '@mui/icons-material';
import AlertDialog from '../AlertDialog';
import ConfirmDialog from '../ConfirmDialog';
import NormalSearchBar from '../search-bar/NormalSearchBar';

const UsersAdminPage = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [users, setUsers] = useState([
    {id: 1, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 2, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 3, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 4, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 5, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 6, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 7, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 8, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 9, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 10, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 11, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 12, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 13, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 14, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 15, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 16, name: 'Nguyen Van B', phone: '0494848484'},  
    {id: 17, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 18, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 19, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 20, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 21, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 22, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 23, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 24, name: 'Nguyen Van B', phone: '0494848484'},  
    {id: 25, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 26, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 27, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 28, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 29, name: 'Nguyen Van B', phone: '0494848484'},  
    {id: 30, name: 'Nguyen Van B', phone: '0494848484'},    
    {id: 31, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 32, name: 'Nguyen Van B', phone: '0494848484'},
    {id: 33, name: 'Nguyen Van A', phone: '0939393939'},
    {id: 34, name: 'Nguyen Van B', phone: '0494848484'},                             
  ])  
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
    setUsers(users.filter(user => user.id !== ID))
    // delete in server
  }    

  // search bar
  const [searchText, setSearchText] = useState('')
  
  const handleSearch = () => {
    alert("You search " + searchText)
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
      <Table aria-label="users table" sx={{ maxHeight: 440 }} className='admin-table'>
        <TableHead>
          <TableRow key="header-row">
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Tooltip title="Xem chi tiết">
                  <IconButton color="secondary" onClick={() => onViewDetail(user)}>
                    <Reviews />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa người dùng">
                  <IconButton color="secondary" onClick={() => setConfirmDel(user.id)}>
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
    <AlertDialog title="Thông tin người dùng" viewUserPopup={!!viewUserPopup} setView={setView}>
      <>
        <Table>
            <TableBody>
            <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{viewUserPopup.id}</TableCell>
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
                <TableCell variant="head">Vai trò</TableCell>
                <TableCell>{viewUserPopup.role}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Ngày sinh</TableCell>
                <TableCell>{viewUserPopup.birthday}</TableCell>
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
