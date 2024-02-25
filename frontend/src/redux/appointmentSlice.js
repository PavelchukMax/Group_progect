import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async ({ date, time, doctor, patient }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/appointments/create',
        { date, time, doctor, patient },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getAppointments = createAsyncThunk(
  'appointments/getAppointments',
  async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/appointments', {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.status = action.error.message || 'Помилка при створенні консультації';
        state.loading = false;
        toast.error(state.status);
      })
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        console.log('Action payload:', action.payload);
        state.loading = false;
        state.appointments = action.payload  || [];
      })
      
      .addCase(getAppointments.rejected, (state, action) => {
        state.status =
          action.error.message || 'Помилка при отриманні списку консультацій';
        state.loading = false;
        toast.error(state.status);
      });
  },
});

export default appointmentSlice.reducer;
