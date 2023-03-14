import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from './img/not-found.png'

const NotFound = () => (
  <div className="not-found">
    <img
      src={NotFoundImg}
      alt="not found"
    />
    <Link to="/" className="link-home">
      Go Back to Homepage
    </Link>
  </div>
);

export default NotFound;