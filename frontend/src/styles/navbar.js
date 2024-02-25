import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  padding: 1rem;
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const NavbarLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: row; /* Добавленный стиль */

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

  &:hover {
    color: #343a40;
    background-color: #fff;
  }
`;

export default { NavbarContainer, NavbarContent, NavbarLinks, LogoutButton };
