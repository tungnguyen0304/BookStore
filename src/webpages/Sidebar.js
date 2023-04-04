import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FactoryIcon from '@mui/icons-material/Factory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CommentIcon from '@mui/icons-material/Comment';
import { useMediaQuery, Drawer, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import { Stack, Typography, Link, Icon, Box } from '@mui/material';

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    position: 'sticky',
    height: '100vh',   
    top: 0,
    left: 0,
    backgroundColor: '#E0E3E3',
    color: '#11224E',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  },
}));

const DashboardBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: '10px',
  padding: '10px',
  margin: '0px 5px',
});

const SidebarContent = () => {
  return (
    <Stack spacing={2}>
      <Link href="/admin" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <DashboardIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Dashboard
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="/admin/users" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <PeopleAltIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
            Quản lý người dùng
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="/admin/products" underline="none">
      <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <MenuBookIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý sản phẩm
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="/admin/product-info" underline="none">
      <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <FactoryIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý thông tin sản phẩm
          </Typography>
        </DashboardBox>
      </Link>      
      <Link href="/admin/orders" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <ReceiptLongIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý đơn hàng
          </Typography>
        </DashboardBox>
      </Link>
      <Link href="/admin/comments" underline="none">
        <DashboardBox className='secondLayerBox shadowedBox'>
          <Icon>
            <CommentIcon />
          </Icon>
          <Typography variant="subtitle1" sx={{ marginLeft: '10px' }}>
          Quản lý bình luận 
          </Typography>
        </DashboardBox>
      </Link> 
    </Stack>
  );
};

const Sidebar = ({showSideBar, setShowSideBar}) => {
  const isSmallScreen = useMediaQuery('(max-width: 960px)'); // md

  const handleToggle = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div>
      {isSmallScreen ? (
        <StyledDrawer variant="temporary" open={showSideBar} onClose={handleToggle}>
          <SidebarContent />
        </StyledDrawer>
      ) : (
        <StyledDrawer variant="permanent">
          <SidebarContent />
        </StyledDrawer>
      )}
    </div>
  );

}

export default Sidebar;
