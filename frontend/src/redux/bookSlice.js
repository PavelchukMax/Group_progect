import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  books: [],
  book: null, 
  loading: false,
};
export const getAllBooks = createAsyncThunk('book/getAllBooks', async () => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/book', { withCredentials: true });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const searchBooks = createAsyncThunk(
  'book/searchBooks',
  async (searchTerm) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/book/search?q=${searchTerm}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  export const getBookById = createAsyncThunk('book/getBookById', async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/book/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        console.log('Books fetched:', action.payload.books);
        state.loading = false;
        state.books = action.payload.books;
      })
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
      })
        .addCase(searchBooks.pending, (state) => {
          state.loading = true;
          state.books = []; 
        })
        .addCase(searchBooks.fulfilled, (state, action) => {
          state.loading = false;
          state.books = action.payload;
        })
        .addCase(searchBooks.rejected, (state) => {
          state.loading = false;
        })
        .addCase(getBookById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getBookById.fulfilled, (state, action) => {
            state.loading = false;
            state.book = action.payload;
          })
          .addCase(getBookById.rejected, (state) => {
            state.loading = false;
          })
        },
  });

export default bookSlice.reducer;
