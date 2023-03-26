import React, { useState } from "react";
// import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ cartCount, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (term) => {
    // try {
    //   const response = await axios.get(`/api/books/search/${term}`);
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleCartClick = () => {
    console.log("Load cart items");
  };

  return (
    <div className="header-container">
      <a className="header-container-logo" href="/">
        BookStore
      </a>
      <div className="header-form-icon"><form className="header-form" onSubmit={(event) => {
        event.preventDefault(); 
        handleSearchSubmit(searchTerm);
      }}>
        <input className="header-form-search" type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search for books" />
        <button className="header-form-btn" type="submit">Search</button>
      </form>
      <a className="menu-link-icon icon-container" href="/" onClick={(e) => {e.preventDefault(); handleCartClick();}} >
          <ShoppingCartIcon className="header-menu-icon"/>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </a></div>
      <div className="menu">
          <a href="/register" className="header-reg-link">
            Register
          </a>
          <a href="/login" className="header-login-link">
            Login
          </a>
      </div>
    </div>
  );
};

export default Header;
