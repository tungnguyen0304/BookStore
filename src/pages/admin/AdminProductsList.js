import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination, Button} from '@mui/material';
import { ExitToApp, Reviews, Edit } from '@mui/icons-material';
import AlertDialog from '../AlertDialog';
import NormalSearchBar from '../search-bar/NormalSearchBar';
import Meta from "../../components/Meta";

const ProductsAdminPage = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [products, setProducts] = useState([])  
    // search bar
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    axios.get('http://localhost/api/admin/products-list.php')
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
      setProducts(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }, [])
  // get from servers, not by products array
  const pageCount = Math.ceil(products.length / rowsPerPage);  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // fecth new data based on page
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // view product popup
  const [viewProductPopup, setView] = useState(false)
  const onViewDetail = (product) => {
    setView(product)
  }
  
  const handleSearch = () => {
    axios.get('http://localhost/api/admin/products-list.php', {
      params: {
        q: searchText.trim()
      }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .then(response => {
        setProducts(response)
    }) 
    .catch(error => {
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }  

  return (
    <>
    <Meta title="Quản lý sản phẩm"/>
    <Grid container sx={{ mb: 1, mt: 1 }}>
      <Grid item xs={12} sm={8} md={6}>
        <div className='h3'>Quản lý sản phẩm</div>
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
    <Grid container>
      <Link to="add">
        <Button variant='contained' color="primary">Thêm sản phẩm mới</Button>
      </Link>
    </Grid>
    <Box>
      <Table aria-label="products table" className='admin-table'>
        <TableHead>
          <TableRow key="header-row">
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Số lượng đã bán</TableCell>
            <TableCell>Số lượng còn lại</TableCell>
            <TableCell width="200px">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {currentProducts.map((product) => (
            <TableRow key={product.ID}>
              <TableCell scope="row">
                {product.ID}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.sold_qty}</TableCell>
              <TableCell>{product.current_qty}</TableCell>
              <TableCell>
                <Tooltip title="Xem chi tiết">
                  <IconButton  style={{color: 'green'}} onClick={() => onViewDetail(product)}>
                    <Reviews />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tới trang sản phẩm">
                  <Link to={"/product/" + product.ID}>
                      <IconButton style={{color: 'blue'}}>
                        <ExitToApp/>
                      </IconButton>
                  </Link>
                </Tooltip>                
                <Tooltip title="Chỉnh sửa sản phẩm">
                    <Link to={"edit?id=" + product.ID}>
                        <IconButton style={{color: 'gold'}}>
                            <Edit/>
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
    <AlertDialog title="Thông tin sản phẩm" open={!!viewProductPopup} setView={setView}>
      <>
        <Table>
            <TableBody>
            <TableRow>
                <TableCell variant="head">ID</TableCell>
                <TableCell>{viewProductPopup.ID}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Tên</TableCell>
                <TableCell>{viewProductPopup.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Thể loại</TableCell>
                <TableCell>{viewProductPopup.category_name}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Tác giả</TableCell>
                <TableCell>{viewProductPopup.author_name}</TableCell>
            </TableRow>   
            <TableRow>
                <TableCell variant="head">NSX/NXB</TableCell>
                <TableCell>{viewProductPopup.manufacturer_name}</TableCell>
            </TableRow>              
            <TableRow>
                <TableCell variant="head">Giá</TableCell>
                <TableCell>{viewProductPopup.price}</TableCell>
            </TableRow>            
            <TableRow>
                <TableCell variant="head">Số lượng đã bán</TableCell>
                <TableCell>{viewProductPopup.sold_qty}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell variant="head">Số lượng còn lại</TableCell>
                <TableCell>{viewProductPopup.current_qty}</TableCell>
            </TableRow>    
            <TableRow>
                <TableCell variant="head">Trạng thái</TableCell>
                <TableCell>{viewProductPopup.in_stock? "Còn kinh doanh": "Ngưng kinh doanh"}</TableCell>
            </TableRow>                   
            </TableBody>                                                                   
        </Table>     
      </>
    </AlertDialog>
    </>
  );
};


export default ProductsAdminPage;
