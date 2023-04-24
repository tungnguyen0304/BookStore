import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination} from '@mui/material';
import { Reviews } from '@mui/icons-material';
import AlertDialog from '../AlertDialog';
import NormalSearchBar from '../../components/NormalSearchBar';
import Meta from "../../components/Meta";

const OrdersAdminPage = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [orders, setOrders] = useState([])  
    // search bar
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    axios.get('http://localhost/api/admin/orders-list.php')
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
      setOrders(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
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

  // view order popup
  const [viewOrderPopup, setView] = useState(false)
  const onViewDetail = (order) => {
    setView(order)
  }
  const [confirmDel, setConfirmDel] = useState(false)
  const onDelete = (ID) => {
    setOrders(orders.filter(order => order.ID !== ID))
    // delete in server
  }    
  
  const handleSearch = () => {
    axios.get('http://localhost/api/admin/orders-list.php', {
      params: {
        q: searchText.trim()
      }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
        setOrders(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }  

  return (
    <>
    <Meta title="Quản lý đơn hàng"/>
    <Grid container sx={{ mb: 1, mt: 1 }}>
      <Grid item xs={12} sm={8} md={6}>
        <div className='h3'>Quản lý đơn hàng</div>
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
                <Tooltip title="Xem chi tiết">
                  <IconButton  style={{color: 'green'}} onClick={() => onViewDetail(order)}>
                    <Reviews />
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
    <AlertDialog title="Thông tin đơn hàng" open={!!viewOrderPopup} setView={setView}>
      <>
        <Table>
            <TableBody>
            <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{viewOrderPopup.ID}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Tên người nhận hàng</TableCell>
                <TableCell>{viewOrderPopup.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">SĐT</TableCell>
                <TableCell>{viewOrderPopup.phone}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Địa chỉ</TableCell>
                <TableCell>{viewOrderPopup.address}</TableCell>
            </TableRow>   
            <TableRow>
                <TableCell variant="head">Phương thức thanh toán</TableCell>
                <TableCell>{viewOrderPopup.method == '1'? "COD": "Online"}</TableCell>
            </TableRow>            
            <TableRow>
                <TableCell variant="head">Thời gian đặt hàng</TableCell>
                <TableCell>{viewOrderPopup.order_datetime}</TableCell>
            </TableRow>              
            <TableRow>
                <TableCell variant="head">Tiền vận chuyển</TableCell>
                <TableCell>{viewOrderPopup.delivery_cost}</TableCell>
            </TableRow>            
            <TableRow>
                <TableCell variant="head">Tổng tiền</TableCell>
                <TableCell>{viewOrderPopup.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Trạng thái</TableCell>
                <TableCell>{viewOrderPopup.status === 1? "Đã nhận hàng": "Đang giao hàng"}</TableCell>
            </TableRow>                       
            </TableBody>                                                                   
        </Table>     
      </>
    </AlertDialog>
    </>
  );
};


export default OrdersAdminPage;
