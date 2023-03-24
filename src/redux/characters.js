import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCharactersThunk = createAsyncThunk(
  'character', async (currentPage) => {
    const charactersData = await axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.data);
    return charactersData;
  }
)

const initialState = {
  characters: [],
  status: 'idle',
  currentPage: 1,
  allPages: null,
  pagination: false,
  userCardIsOpened: false,
  currentUser: null,
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setOpenedUserCard: (state, action) => {
      state.currentUser = action.payload;
      state.userCardIsOpened = true;
    },
    setIsClosedUserCard: (state) => {
      state.userCardIsOpened = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharactersThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCharactersThunk.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.allPages = action.payload.info.pages
      state.status = 'resolved';
    });
    builder.addCase(getCharactersThunk.rejected, (state) => {
      state.characters = [];
      state.status = 'rejected';
    })
  }
});

export  { charactersSlice };
export const { setCurrentPage, setPagination, setOpenedUserCard, setIsClosedUserCard } = charactersSlice.actions;



