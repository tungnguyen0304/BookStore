import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Tooltip, Grid, Pagination} from '@mui/material';
import { ExitToApp, Block, CheckCircle } from '@mui/icons-material';
import NormalSearchBar from '../search-bar/NormalSearchBar';

const CommentsAdminPage = () => {
  // fecth from server 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [comments, setComments] = useState([])  
    // search bar
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    axios.get('http://localhost/api/admin/comments-list.php')
    .then(response => {
      // console.log(response)
      return response.data
    })
    .then(response => {
      setComments(response)
    }) 
    .catch(error => {
      console.log(error)
      // if (error.response.status === 404) {
      //   navigate('/error/404');
      // }
    });    
  }, [])
  // get from servers, not by comments array
  const pageCount = Math.ceil(comments.length / rowsPerPage);  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // fecth new data based on page
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentComments = comments.slice(startIndex, endIndex);
  
  const handleSearch = () => {
    axios.get('http://localhost/api/admin/comments-list.php', {
      params: {
        q: searchText.trim()
      }
    })
    .then(response => {
      // console.log(response)
      return response.data
    })
    .then(response => {
      setComments(response)
    }) 
    .catch(error => {
      setComments([])
    });    
  }  

  const handleToggleCommentStatus = (ID) => {
    axios.get('http://localhost/api/admin/toggle-comment-status.php', {
      params: {
        id: ID
      }
    })
    .then(response => {
      // console.log(response)
      return response.data
    })
    .then(response => {
      // find the comment with the given ID in the comment state
      const commentIndex = comments.findIndex(comment => comment.ID === ID);
  
      // toggle the status of the comment
      const newStatus = comments[commentIndex].status === '1' ? null : '1';
      const updatedComment = {
        ...comments[commentIndex],
        status: newStatus
      };
  
      // update the comment state with the updated comment
      const newComments = [...comments];
      newComments[commentIndex] = updatedComment;
      setComments(newComments);
    }) 
    .catch(error => {
      console.log(error)
    });    
  }

  return (
    <>
    <Grid container sx={{ mb: 1, mt: 1 }}>
      <Grid item xs={12} sm={8} md={6}>
        <div className='pageTitle'>Quản lý bình luận</div>
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
    {comments.length !== 0 ? (
    <Box>
      <Table aria-label="comments table" className='admin-table'>
        <TableHead>
          <TableRow key="header-row">
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell>Thời gian bình luận</TableCell>
            <TableCell width="150px">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {currentComments.map((comment) => (
            <TableRow key={comment.ID}>
              <TableCell scope="row">
                {comment.ID}
              </TableCell>
              <TableCell>{comment.user_name}</TableCell>
              <TableCell>{comment.product_name}</TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell>{comment.comment_datetime}</TableCell>
              <TableCell>
                <Tooltip title="Tới trang sản phẩm">
                  <Link to={"/product/" + comment.productID}>
                      <IconButton color="secondary">
                        <ExitToApp/>
                      </IconButton>
                  </Link>
                </Tooltip>
                {comment.status === null ? (
                  <Tooltip title="Khóa bình luận">
                    <IconButton style={{color:'red'}} onClick={() => handleToggleCommentStatus(comment.ID)}>
                      <Block/>
                    </IconButton>
                  </Tooltip>    
                ) : (
                  <Tooltip title="Mở khóa bình luận">
                    <IconButton style={{color:'green'}} onClick={() => handleToggleCommentStatus(comment.ID)}>
                      <CheckCircle/>
                    </IconButton>
                  </Tooltip>    
                )}            
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
      <div className='text-center lead'>Không có bình luận nào</div>
    )}
    </>
  );
};


export default CommentsAdminPage;
