import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/auth/users', {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ username, address, password }) => {
    try {
      const { data } = await axios.put(
        'http://localhost:3001/api/auth/update',
        { username, address, password },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password, confirmPassword }) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        password,
        confirmPassword,
      }, { withCredentials: true });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      }, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getMe = createAsyncThunk(
  'auth/me',
  async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/me', {}, { withCredentials: true });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    allUsers: [],
    isLoading: false,
    status: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = action.error.message || 'Помилка при реєстрації';
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = action.error.message || 'Помилка при вході';
        state.isLoading = false;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.user = action.payload?.user;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = action.error.message || 'Помилка при отриманні даних юзера';
        state.isLoading = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = action.error.message || 'Ошибка при обновлении данных пользователя';
        state.isLoading = false;
      });
  },
});

export const { setUser, logout } = authSlice.actions;
export const checkIsAuth = (state) => Boolean(state.auth.user);
export const selectAllUsers = (state) => state.auth.allUsers;
export default authSlice.reducer;
