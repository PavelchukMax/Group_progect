import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, checkIsAuth } from '../redux/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector((state) => state.auth || {});
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ username, password }));
    } catch (error) {
      console.error(error);
      toast.error('Неправильний логін або пароль'); 
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-xl text-white text-center">Авторизація</h1>
      <label className="text-lg text-gray-400">
        Логін:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-lg text-gray-400">
        Пароль:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex justify-center items-center bg-gray-800 text-lg text-white rounded-sm py-2 px-4"
        >
          Увійти
        </button>
        <Link to="/register" className="flex justify-center items-center bg-gray-800 text-lg text-white py-2 px-4">
          Реєстрація
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
