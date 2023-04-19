import React from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Logout from '@mui/icons-material/Logout';
import styled from '@emotion/styled';

const MenuLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Header = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const role = Cookies.get('role')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };  

  const handleLogOut = async () => {
    try {
      const response = await axios.post('http://localhost/api/logout.php')
      Cookies.remove('role')
      // console.log(response)
      navigate('/')
    } catch (error) {
        console.log(error)
    };  
  }
  const handleSearchSubmit = async (term) => {
    // try {
    //   const response = await axios.get(`http://localhost/api/books/search/${term}`);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };  

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h2>
                <Link to='/' className="text-white">Book Store</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Tìm kiếm sản phẩm ở đây ..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                  </Link>
                </div>                
                <div>
                  <Link
                    to="/login"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    <p className="mb-0">
                      Đăng nhập
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/signup"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                    <p className="mb-0">
                      Đăng ký
                    </p>
                  </Link>
                </div>   
                <Tooltip title="Hồ sơ của bạn">
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
                    <Avatar /> <MenuLink href='/view-profile'>Hồ sơ của bạn</MenuLink>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> <MenuLink href='/edit-profile'>Chỉnh sửa hồ sơ</MenuLink>
                  </MenuItem>          
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <ReceiptLongIcon fontSize="small" />
                    </ListItemIcon>
                    <MenuLink href='/orders'>Danh sách đơn hàng</MenuLink>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleLogOut()
                    handleClose()
                  }}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <MenuLink href='#'>Đăng xuất</MenuLink>
                  </MenuItem>
                </Menu>                             
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Danh mục cửa hàng
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="/category/sach-trong-nuoc">
                          Sách trong nước
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/category/sach-ngoai-quoc">
                          Sách ngoại quốc
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/category/van-phong-pham">
                          Văn phòng phẩm
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/category/do-choi">
                          Đồ chơi
                        </Link>
                      </li> 
                      <li>
                        <Link className="dropdown-item text-white" to="/category/hang-luu-niem">
                          Hàng lưu niệm
                        </Link>
                      </li>                                            
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
                    {/* <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink> */}
                    <NavLink to="/contact">Liên hệ</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
