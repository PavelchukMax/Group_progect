import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  patients: [],
  patient: null, 
  loading: false,
};
export const updatePatient = createAsyncThunk('patient/updatePatient', async ({ id, diagnosis, instructions }) => {
  try {
    const { data } = await axios.put(`http://localhost:3001/api/patient/${id}`, { diagnosis, instructions });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createPatient = createAsyncThunk('patient/createPatient', async (params) => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/patient', params);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const deletePatient = createAsyncThunk('patient/deletePatient', async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/patient/${id}`);
    return id;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const getAllPatients = createAsyncThunk('patient/getAllPatients', async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/patient', { withCredentials: true });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

  export const getPatientById = createAsyncThunk('patient/getPatientById', async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/patient/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createPatient.pending, (state) => {
          state.loading = true;
        })
        .addCase(createPatient.fulfilled, (state, action) => {
          state.loading = false;
          state.patients.push(action.payload);
        })
        .addCase(createPatient.rejected, (state) => {
          state.loading = false;
        })
        .addCase(getAllPatients.pending, (state) => {
          state.loading = true;
        })
        .addCase(getAllPatients.fulfilled, (state, action) => {
          state.loading = false;
          state.patients = action.payload.patients;
        })
        .addCase(getAllPatients.rejected, (state) => {
          state.loading = false;
        })
        .addCase(getPatientById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getPatientById.fulfilled, (state, action) => {
            state.loading = false;
            state.patient = action.payload;
          })
          .addCase(getPatientById.rejected, (state) => {
            state.loading = false;
          })
          .addCase(updatePatient.pending, (state) => {
            state.loading = true;
          })
          .addCase(updatePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.patients = state.patients.map(patient => (patient.id === action.payload.id ? action.payload : patient));
            if (state.patient && state.patient.id === action.payload.id) {
              state.patient = action.payload;
            }
          })
          .addCase(updatePatient.rejected, (state) => {
            state.loading = false;
          })
          .addCase(deletePatient.pending, (state) => {
            state.loading = true;
          })
          .addCase(deletePatient.fulfilled, (state, action) => {
            state.loading = false;
            state.patients = state.patients.filter(patient => patient.id !== action.payload);
            if (state.patient && state.patient.id === action.payload) {
              state.patient = null;
            }
          })
          .addCase(deletePatient.rejected, (state) => {
            state.loading = false;
          });
        },
  });

export default patientSlice.reducer;
