import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
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
      <NavbarContent style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          <>
            <NavbarLinks>
              <Link to="/">Головна</Link>
              <Link to="/patients">Пацієнти</Link>
              <Link to="patients/new">Додати пацієнта</Link>
              <Link to="profile">Профіль</Link>
            </NavbarLinks>
            <LogoutButton onClick={handleLogout}>Вийти</LogoutButton>
          </>
        ) : null}
      </NavbarContent>
    </NavbarContainer>
  );
};
export default Navbar;
