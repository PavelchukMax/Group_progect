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
      <p>Ласкаво просимо, {user.username}!</p>
      <div className="mx-auto max-w-2xl text-center">
      <NavLink to="/AllRents" className="block">
      <button className="bg-blue-500 hover:bg-blue-700 text-lg text-white py-2 px-4 rounded mx-auto">
      Усі активні аренди
      </button>
     </NavLink>
     <NavLink to="/MyRents" className="block">
      <button className="bg-blue-500 hover:bg-blue-700 text-lg text-white py-2 px-4 rounded mx-auto">
      Мої аренди
      </button>
     </NavLink>
    </div>  
    </div>
  );
};

export default MainPage;
