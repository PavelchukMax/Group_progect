import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "../styles/mainPage.css";

/**
 * Головна сторінка програми.
 * @module MainPage
 * @returns {JSX.Element} Елемент React, що представляє головну сторінку.
 */

const MainPage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="main-page-container">
      <div className='main-page-text'>
        Ласкаво просимо, <div className='bold main-page-text'>{user.username}!</div>
        </div>
      <div className="main-page-button-container">
      <NavLink to="/AllRents" className="main-page-link">
      <button className="main-page-button">
      Усі активні аренди
      </button>
     </NavLink>
     <NavLink to="/MyRents" className="main-page-link">
      <button className="main-page-button">
      Мої аренди
      </button>
     </NavLink>
    </div>  
    </div>
  );
};

export default MainPage;
