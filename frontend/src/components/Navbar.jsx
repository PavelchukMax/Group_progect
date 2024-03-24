import React from 'react';
import { Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/navbar.css'
import { NavbarContainer, NavbarContent, NavbarLinks} from '../styles/navbar.js';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavbarContainer>
      <NavbarContent className='a'>
        {user ? (
          <>
            <div className="book-text">Book</div>
            <NavbarLinks className='b'>
              <Link className='navbar-text' to="/">Головна</Link>
              <Link className='navbar-text' to="/addRent">Замволення</Link>
              <Link className='navbar-text' to="/books">Каталог</Link>
              <Link className='navbar-text' to="profile">Контакти</Link>
            </NavbarLinks>
            <NavbarLinks className='b'>
            <Link className='navbar-text' to="profile">Профіль</Link>
            </NavbarLinks>
          </>
        ) : null}
      </NavbarContent>
    </NavbarContainer>
  );
};
export default Navbar;
