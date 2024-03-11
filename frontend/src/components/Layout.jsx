import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="layout-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
