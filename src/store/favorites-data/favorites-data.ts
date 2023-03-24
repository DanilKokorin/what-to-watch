import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { FavoritesState } from '../../types/slices';

const initialState: FavoritesState = {
  favorites: [],
  emptyFavorites: true,
};

export const favoritesData = createSlice({
  name: NameSpace.favorites,
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setEmpty: (state, action) => {
      state.emptyFavorites = action.payload;
    },
  },
});

export const { setFavorites, setEmpty } = favoritesData.actions;
