import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import '../styles/navbar.css'
import { NavbarContainer, NavbarContent, NavbarLinks, LogoutButton } from '../styles/navbar.js';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavbarContent className='a'>
        {user ? (
          <>
            <div className="book-text">Book</div>
            <NavbarLinks className='b'>
              <Link className='navbar-text' to="/">Про нас</Link>
              <Link className='navbar-text' to="/books">Замволення</Link>
              <Link className='navbar-text' to="/addAppointment">Каталог</Link>
              <Link className='navbar-text' to="profile">Відгуки</Link>
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
