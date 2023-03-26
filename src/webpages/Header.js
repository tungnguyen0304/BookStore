import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {FaShoppingCart} from "react-icons/fa"
const Header = ({ cartCount, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (term) => {
    try {
      const response = await axios.get(`/api/books/search/${term}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartClick = () => {
    console.log("Load cart items");
  };

  return (
    <div className="header-container">
      <Link to="/" className="header-container-logo">
        BookStore
      </Link>
      <div className="header-form-icon"><form className="header-form" onSubmit={(event) => {
        event.preventDefault(); 
        handleSearchSubmit(searchTerm);
      }}>
        <input className="header-form-search" type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="Search for books" />
        <button className="header-form-btn" type="submit">Search</button>
      </form>
      <a className="menu-link-icon icon-container" href="/" onClick={(e) => {e.preventDefault(); handleCartClick();}} >
          <FaShoppingCart className="header-menu-icon"/>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </a></div>
      <div className="menu">
        
      <Link to="/register" className="header-reg-link">
                register
          </Link>
           
          <Link to="/login" className="header-login-link">
            Login
          </Link>
          
       
      </div>
    </div>
  );
};

export default Header;
