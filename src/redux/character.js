
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  character: [],
  status: 'idle',
  currentPage: 1,

}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacterThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getCharacterThunk.fulfilled, (state, action) => {


      state.character = [...state.character, action.payload.results];

      state.status = 'resolved';
    });
    builder.addCase(getCharacterThunk.rejected, (state) => {
      state.character = [];
      state.status = 'failed';
    })
  }
});

export { characterSlice };
export const {  setCurrentPage } = characterSlice.actions;



