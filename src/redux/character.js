
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const getCharacterThunk = createAsyncThunk(
  'character', async (number) => {
    const characterData = await axios.get(`https://rickandmortyapi.com/api/character/?page=${number}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.data);

    return characterData;
  }
)

const initialState = {
  characters: [],
  status: 'idle',
  currentPage: 1,
  pages: [],
  isPagination: false
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setIsPagination: (state, action) => {
      state.isPagination = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacterThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCharacterThunk.fulfilled, (state, action) => {


      // state.character = [...state.character, action.payload.results];
      state.characters = action.payload.results;
      state.pages = action.payload.info.pages
      state.status = 'resolved';
    });
    builder.addCase(getCharacterThunk.rejected, (state) => {
      state.character = [];
      state.status = 'failed';
    })
  }
});

export { characterSlice };
export const { setCurrentPage, setIsPagination } = characterSlice.actions;



