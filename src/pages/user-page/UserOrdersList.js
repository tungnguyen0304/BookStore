import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination} from '@mui/material';
import { ListAlt } from '@mui/icons-material';
import Meta from "../../components/Meta";
import Container from '../../components/Container';

const UserOrdersList = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [orders, setOrders] = useState([])  

  useEffect(() => {
    axios.get('http://localhost/api/user-orders-list.php')
    .then(response => {
    //   console.log(response)
      return response.data
    })
    .then(response => {
      setOrders(response)
    }) 
    .catch(error => {
        if (error.response.status === 404) {
            // console.log(error)
            setOrders([])
        }
    });    
  }, [])
  // get from servers, not by orders array
  const pageCount = Math.ceil(orders.length / rowsPerPage);  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // fecth new data based on page
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <>
    <Meta title="Đơn hàng của bạn"/>
    <Container class1="home-wrapper-2 py-3">
    <Grid container sx={{ mb: 1, mt: 1 }}>
        <div className='h3'>Đơn hàng của bạn</div>
    </Grid>    
    {orders.length !== 0 ? (
    <Box>
      <Table aria-label="orders table" className='admin-table'>
        <TableHead>
          <TableRow key="header-row">
            <TableCell>ID</TableCell>
            <TableCell>Tên người nhận hàng</TableCell>
            <TableCell>Thời gian đặt hàng</TableCell>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell width="150px">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {currentOrders.map((order) => (
            <TableRow key={order.ID}>
              <TableCell scope="row">
                {order.ID}
              </TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.order_datetime}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status === 1? "Đã nhận hàng": "Đang giao hàng"}</TableCell>
              <TableCell>
                <Tooltip title="Xem nội dung đơn hàng">
                    <Link to={"/orders/order?id=" + order.ID}>
                        <IconButton  style={{color: 'blue'}}>
                            <ListAlt />
                        </IconButton>
                    </Link>
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
    ) : (
        <div className='text-center lead'>Bạn không có đơn hàng nào</div>
    )}
    </Container>
    </>
  );
};


export default UserOrdersList;
