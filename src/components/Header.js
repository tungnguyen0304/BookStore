import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuList } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Logout from '@mui/icons-material/Logout';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userRole";
import SuggestionSearchBar from "../components/SuggestionSearchBar";
// import { useMediaQuery } from 'react-responsive'
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const MenuLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const AccountButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);  
  const handleClose = () => {
    setAnchorEl(null);
  };  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogOut = async () => {
    try {
      const response = await axios.post('http://localhost/api/logout.php')
      dispatch(logout())
      navigate('/');
    } catch (error) {
        console.log(error)
    };  
  }  
  return (
  <>
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
      <Avatar /> <MenuLink onClick={() => navigate('/view-profile')}>Hồ sơ của bạn</MenuLink>
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
  </>
  )
}

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([])
  const userRole = useSelector((state) => state.userRole);
  const navigate = useNavigate()
  const timeoutRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm)
      navigate('/catalog-search?q=' + searchTerm);
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    if (searchTerm === '') {
      return;
    }
    timeoutRef.current = setTimeout(() => {
      axios.get('http://localhost/api/products.php', {
        params: {
          q: searchTerm
        }
      })
      .then(response => {
        const firstFiveProducts = response.data.products.slice(0, 5);
        setProducts(firstFiveProducts);
      })
      .catch(error => {
        console.error(error);
      });
    }, 200);
  
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [searchTerm]);
   

  return (
    <>
      <header className="header-upper py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 d-flex justify-content-center align-items-center">
              <h2>
                <Link to='/' className="text-white">Book Store</Link>
              </h2>
            </div>
            <div className="col-12 col-sm-7 col-md-6 col-lg-5">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <SuggestionSearchBar
                  label="Tìm kiếm sản phẩm ở đây ..."
                  searchText={searchTerm}
                  setSearchText={setSearchTerm}
                  handleSearch={handleSubmit}
                >
                  {products.length !== 0 && (
                  <MenuList>
                      {products.map(product => (
                        <Link key={product.ID} to={"/product/" + product.unique_name}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar alt={product.name} src={product.image} />
                          </ListItemAvatar>
                          <ListItemText primary={product.name} />
                        </ListItem>
                        </Link>
                    ))}
                  </MenuList>
                  )}
                </SuggestionSearchBar>
              </div>
            </form>
            </div>
            <div className="col-12 col-sm-5 col-md-6 col-lg-4 mt-2">
              <div className="header-upper-links d-flex align-items-center gap-30">
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                  </Link>
                </div>   
                {userRole === '' ? (
                  <div className="d-flex align-items-center gap-15 justify-content-end">
                    <div className="">
                      <Link to="/login" className="d-flex align-items-center gap-10 text-white">
                        <img src={user} alt="user" />
                        <div className="mb-0 d-sm-block">Đăng nhập</div>
                      </Link>
                    </div>
                    <div className="d-md-block">
                      <span className="text-white">&nbsp;|&nbsp;</span>
                    </div>
                    <div className="d-md-block">
                      <Link to="/signup" className="d-flex align-items-center gap-10 text-white">
                        <img src={user} alt="user" />
                        <div className="mb-0">Đăng ký</div>
                      </Link>
                    </div>
                  </div>
                ) : 
                  <AccountButton/>
                }
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex flex-wrap align-items-center gap-30">
                {userRole === '1' && (
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <AdminPanelSettingsIcon/>
                      <span>
                        Quản trị viên
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item text-white" href="/admin/users">
                          Quản lý người dùng
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/admin/products">
                          Quản lý sản phẩm
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/admin/products/info">
                          Quản lý thông tin sản phẩm
                        </a>
                      </li>                      
                      <li>
                        <a className="dropdown-item text-white" href="/admin/orders">
                        Quản lý đơn hàng
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/admin/comments">
                        Quản lý bình luận 
                        </a>
                      </li>                                            
                    </ul>
                  </div>
                </div>                
                )}
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
                      <span>
                        Danh mục cửa hàng
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item text-white" href="/category/sach-trong-nuoc">
                          Sách trong nước
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/category/sach-ngoai-quoc">
                          Sách ngoại quốc
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/category/van-phong-pham">
                          Văn phòng phẩm
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item text-white" href="/category/do-choi">
                          Đồ chơi
                        </a>
                      </li> 
                      <li>
                        <a className="dropdown-item text-white" href="/category/hang-luu-niem">
                          Hàng lưu niệm
                        </a>
                      </li>                                            
                    </ul>
                  </div>
                </div>
                <div className="menu-links d-none d-sm-block">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
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
