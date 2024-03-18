import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  padding: 1rem;
`;

export const NavbarContent = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const NavbarLinks = styled.div`
  display: flex;
  gap: 5rem;
  flex-direction: column; /* Добавленный стиль */

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #ccc;
    }
  }

  button {
    color: #fff;
    border: 1px solid #fff;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
      color: #343a40;
      background-color: #fff;
    }
  }
`;

export const LogoutButton = styled.button`
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width:80%;

  &:hover {
    color: #343a40;
    background-color: #fff;
  }
`;

export default { NavbarContainer, NavbarContent, NavbarLinks, LogoutButton };
