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
    <div className='outer'>
    <form onSubmit={(e) => e.preventDefault()} className="inner">
      <h1 className='register-xl-text'>Реєстрація</h1>
      <label className='input-outer register-text'>
        Логін:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className='register-input-text'
        />
      </label>
      <label className='input-outer register-text'>
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='register-input-text'
        />
      </label>
      <label className='input-outer register-text'>
        Підтвердіть пароль:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className='register-input-text'
        />
      </label>
      <div className="flex gap-8 al-center justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="register-button"
        >
          Підтвердити
        </button>
        <Link to="/login" className="register-button" style={{width:200}}>
          Вже є акаунт?
        </Link>
      </div>
    </form>
    </div>
  );
};

export default RegisterPage;
