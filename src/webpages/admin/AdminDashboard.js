import React from 'react';
import { Stack, Typography, Link, Icon, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CommentIcon from '@mui/icons-material/Comment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

const DashboardBox = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '10px',
});

function AdminDashboard() {
  return (
    <>
    <div className='pageTitle'>Dashboard</div>
    <Stack spacing={2}>
      <Link href="admin/users" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <PeopleAltIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
            Quản lý người dùng
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="admin/products" underline="none">
      <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <MenuBookIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý sản phẩm
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="admin/orders" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <ReceiptLongIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý đơn hàng
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="admin/comments" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <CommentIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý bình luận 
          </Typography>
        </DashboardBox>
      </Link> 
      {/* <Link href="admin/contacts" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <ContactPhoneIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý thông tin liên hệ
          </Typography>
        </DashboardBox>
      </Link>             */}
    </Stack>
    </>
  );
}

export default AdminDashboard;