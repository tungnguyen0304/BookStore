import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Tooltip from '@mui/material/Tooltip';
import AlertDialogSlide from '../AlertDialogSlide';

const UsersTable = () => {
  // fecth from server
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
  ])
  const [viewUserPopup, setView] = useState(false)
  const onViewDetail = (user) => {
    setView(user)
  }
  const onDelete = (ID) => {
    setUsers(users.filter(user => user.id !== ID))
    // delete in server
  }  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div className='pageTitle'>Danh sách người dùng</div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }} className='admin-table'>
      <Table stickyHeader aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>SĐT</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
              <TableCell scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Tooltip title="Xem chi tiết">
                  <IconButton color="secondary" onClick={() => onViewDetail(user)}>
                    <ReviewsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa người dùng">
                  <IconButton color="secondary" onClick={() => onDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <AlertDialogSlide title="Thông tin người dùng" viewUserPopup={viewUserPopup} setView={setView}>
        <Table>
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
        </Table>     
    </AlertDialogSlide>
    </>
  );
};

export default UsersTable;
