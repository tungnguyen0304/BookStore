import * as React from 'react';
// import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SuggestionSearchBar from "./search-bar/SuggestionSearchBar";
import { Grid, useMediaQuery } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Logout from '@mui/icons-material/Logout';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import styled from '@emotion/styled';
import DashboardIcon from "@mui/icons-material/Dashboard";


const MenuLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const UserHeader = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchSubmit = async (term) => {
    // try {
    //   const response = await axios.get(`/api/books/search/${term}`);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
    <Grid container alignItems="center" className="header-container">
      <Grid container item xs={3} md={3}>
        <Grid item xs={12} md={3}>
          <IconButton
            href='/'
            size="small"
            sx={{ ml: 2 }}
          >
            <TipsAndUpdatesIcon/>
          </IconButton>    
        </Grid> 
        <Grid item md={9} sx={{ display: { xs: 'none', md: 'block' } }}>
          <a className='header-container-logo' href='/'>Bookstore</a>
        </Grid>      
      </Grid>
      <Grid item xs={5} md={7}>
        <SuggestionSearchBar 
          label="Tìm kiếm..." 
          searchText={searchTerm}
          setSearchText={setSearchTerm}
          handleSearch={handleSearchSubmit}
        />        
      </Grid>
      <Grid item xs={4} md={2} justify="flex-end" align="right">
          <IconButton
            href='cart'
            size="small"
            sx={{ ml: 2 }}
          >
            <ShoppingCartIcon/>
          </IconButton> 
          <Tooltip title="Ho so cua ban">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> <MenuLink href='/view_profile'>Ho so cua ban</MenuLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> <MenuLink href='/edit_profile'>Chinh sua ho so</MenuLink>
          </MenuItem>          
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ReceiptLongIcon fontSize="small" />
            </ListItemIcon>
            <MenuLink href='/orders'>Danh sach don hang</MenuLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <MenuLink href='#'>Dang xuat</MenuLink>
          </MenuItem>
        </Menu>
      </Grid>            
    </Grid>
    </>
  );
};

const AdminHeader = ({showSideBar, setShowSideBar}) => {
  const isSmallScreen = useMediaQuery('(max-width: 960px)'); // md
  const [searchTerm, setSearchTerm] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };    

  const handleSearchSubmit = async (term) => {
    // try {
    //   const response = await axios.get(`/api/books/search/${term}`);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
    <Grid container alignItems="center" className="header-container">
      <Grid container item xs={3} md={3}>
        <Grid item xs={3} sx={{display: {xs: 'block', md: 'none'}}}>
          {isSmallScreen && (
            <IconButton onClick={handleToggleSidebar}>
              <DashboardIcon />
            </IconButton>      
          )}        
        </Grid>  
        <Grid item xs={9} md={3}>
          <IconButton
            href='/'
            size="small"
            sx={{ ml: 2 }}
          >
            <TipsAndUpdatesIcon/>
          </IconButton>    
        </Grid> 
        <Grid item md={9} sx={{ display: { xs: 'none', md: 'block' } }}>
          <a className='header-container-logo' href='/'>Bookstore</a>
        </Grid>      
      </Grid>
      <Grid item xs={5} md={7}>
        <SuggestionSearchBar 
          label="Tìm kiếm..." 
          searchText={searchTerm}
          setSearchText={setSearchTerm}
          handleSearch={handleSearchSubmit}
        />        
      </Grid>
      <Grid item xs={4} md={2} justify="flex-end" align="right">
          <Tooltip title="Ho so cua ban">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> <MenuLink href='/view_profile'>Ho so cua ban</MenuLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> <MenuLink href='/edit_profile'>Chinh sua ho so</MenuLink>
          </MenuItem>          
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <MenuLink href='#'>Dang xuat</MenuLink>
          </MenuItem>
        </Menu>
      </Grid>            
    </Grid>
    </>
  );
};

export {UserHeader, AdminHeader};
