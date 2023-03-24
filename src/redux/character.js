
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
  characters: [],
  status: 'idle',
  currentPage: 1,
  pages: [],
  isPagination: false,
  userCardOpened:false,
  currentUser: null,
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
    },
    setOpenedUserCard: (state, action) => {
      state.currentUser = action.payload;
      state.userCardOpened = true;
    },
    setClosedUserCard: (state) => {
      
      state.userCardOpened = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacterThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCharacterThunk.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.pages = action.payload.info.pages
      state.status = 'resolved';
    });
    builder.addCase(getCharacterThunk.rejected, (state) => {
      state.characters = [];
      state.status = 'rejected';
    })
  }
});

export { characterSlice };
export const { setCurrentPage, setIsPagination, setOpenedUserCard, setClosedUserCard } = characterSlice.actions;



