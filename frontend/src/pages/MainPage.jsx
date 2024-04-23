import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "../styles/mainPage.css";
import library1 from "../images/library1.jpg"
import library2 from "../images/library2.jpg"
import library3 from "../images/library3.jpg"
import library4 from "../images/library4.jpg"
import library5 from "../images/library5.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
/**
 * Головна сторінка програми.
 * @module MainPage
 * @returns {JSX.Element} Елемент React, що представляє головну сторінку.
 */

const MainPage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="main-page-container">
        <div style={{margin:"auto", marginBottom:0}}>
        <Carousel width={600} height={300} interval={2000} showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} infiniteLoop={true}>
                <div width={600} height={300}>
                    <img width={600} height={300} src={library1} />
                </div>
                <div width={600} height={300}>
                    <img width={600} height={300} src={library2} />
                </div>
                <div width={600} height={300}>
                    <img width={600} height={300} src={library3} />
                </div>
                <div width={600} height={300}>
                    <img width={600} height={300} src={library4} />
                </div>
                <div width={600} height={300}>
                    <img width={600} height={300} src={library5} />
                </div> 
            </Carousel>
            </div> 
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
