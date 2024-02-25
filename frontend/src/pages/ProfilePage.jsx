import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAddress(user.address || 'адресу не надано'); 
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ username, address, password }));
  };

  return (
    <div>
      <h2>Профиль пользователя</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Логин:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="address">Адрес:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default ProfilePage;
