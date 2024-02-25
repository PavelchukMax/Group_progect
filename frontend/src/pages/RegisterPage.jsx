import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser, checkIsAuth } from '../redux/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/register.css';

const RegisterPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { status } = useSelector((state) => state.auth || {});
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
    toast.error(status);}
  }, [status]);

  useEffect(() => {
    if (isAuth) {
      navigate('/login'); 
    }
  }, [isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      
      if (username.length < 8) {
        toast.error('Логін повинен містити принаймні 8 символів');
        return;
      }
      
      if (password.length < 8) {
        toast.error('Пароль повинен містити принаймні 8 символів');
        return;
      }
  
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (!specialCharRegex.test(password)) {
        toast.error('Пароль повинен містити принаймні один спеціальний символ');
        return;
      }
  
      if (password !== confirmPassword) {
        toast.error('Паролі не співпадають');
        return;
      }
  
      await dispatch(registerUser({ username, password, confirmPassword }));
      setPassword('');
      setUserName('');
      setConfirmPassword('');
      toast.success('Реєстрація успішна');
    } catch (error) {
      console.error(error);
      toast.error('Сталася помилка при реєстрації');
    }
  };
  

  return (
    <form onSubmit={(e) => e.preventDefault()} className="register-form">
      <h1>Реєстрація</h1>
      <label>
        Логін:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
      </label>
      <label>
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      <label>
        Підтвердіть пароль:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center bg-gray-600 text-lg text-white rounded-sm py-1 px-4"
        >
          Підтвердити
        </button>
        <Link to="/login" className="flex justify-center items-center text-lg text-white py-1 px-4">
          Вже є акаунт?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
