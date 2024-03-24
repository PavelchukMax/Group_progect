import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const createRent = createAsyncThunk(
  'rents/createRent',
  async ({ datestart, datefinish, User_name, book_name, User_Address, User_realname }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/rents/create',
        { datestart, datefinish, User_name, book_name, User_Address, User_realname },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getRents = createAsyncThunk(
  'rents/getRents',
  async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/rents', {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const rentSlice = createSlice({
  name: 'rents',
  initialState: {
    rents: [],
    loading: false,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRent.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(createRent.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(createRent.rejected, (state, action) => {
        state.status = action.error.message || 'помилка при створенні аренди';
        state.loading = false;
        toast.error(state.status);
      })
      .addCase(getRents.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(getRents.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.loading = false;
        state.rents = action.payload || [];
      })
      .addCase(getRents.rejected, (state, action) => {
        state.status = action.error.message || 'Помилка при отриманні списку аренд';
        state.loading = false;
        toast.error(state.status);
      });
  },
});

export default rentSlice.reducer;
