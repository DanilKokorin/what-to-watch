import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ErrorProcess } from '../../types/slices';

const initialState: ErrorProcess = {
  errorMovieLoading: false,
};

export const errorProcess = createSlice({
  name: NameSpace.errors,
  initialState,
  reducers: {
    setErrorMovieLoading: (state, action) => {
      state.errorMovieLoading = action.payload;
    },
  },
});

export const { setErrorMovieLoading } = errorProcess.actions;
