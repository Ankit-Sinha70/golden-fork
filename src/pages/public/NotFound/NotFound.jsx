import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = () => {
  return (
    <div className="error">

    <div className="error__content">
      <div className="error__title">
      <h1 className="error__num">4<span>0</span>4</h1>
      <h2>Page Not Found</h2>
      </div>
      <p className="error__message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
    </div>
  );
};

export default NotFound;
