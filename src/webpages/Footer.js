import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaHeadphones, FaFacebook,FaTwitter,FaGoogle,FaYoutube} from "react-icons/fa"



const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setNewsletterEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/newsletter/subscribe', { email: newsletterEmail });
      setIsSubscribed(true);
      setError(false);
    } catch (error) {
      console.log(error);
      setIsSubscribed(false);
      setError(true);
    }
  };

  useEffect(() => {
    // Get newsletter subscription status from server
    // setIsSubscribed state accordingly
  }, []);

  return (
    <div>
        <div className="footer-head">
          <div className="footer-head-text-icon">
            <h1>BookStore</h1>
          </div>
          <div className="footer-head-text-icon ">
            <ul className='box-social'>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-fb-icon'><FaFacebook/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-tw-icon'><FaTwitter/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-gg-icon'><FaGoogle/></span></a></li>
            <li ><a ><span className='box-social-margin-right box-social-icon-link back-gr-yt-icon'><FaYoutube/></span></a></li>
            </ul>
          </div>
        </div>
      <footer>
        <div>
        
          <h3>Subscribe to our newsletter</h3>
          {isSubscribed ? (
            <p>Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={handleInputChange}
              />
              <button className='footer-btn' type="submit">Subscribe</button>
              {error && <p>An error occurred. Please try again later.</p>}
            </form>
          )}
        </div>
        <div>
          <h3>Contact us</h3>
          <p>Email: info@bookstore.com</p>
          <span style={{display:'flex'}}><FaHeadphones className='footer-contact-icon'/><p>Phone: +1 (123) 456-7890</p></span>
          
        </div>
      </footer>
    </div>
  );
};

export default Footer;
