import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../constants';
import { ReviewState } from '../../types/slices';

const initialState: ReviewState = {
  comments: [],
  isCommentLoaded: false,
  isCommentSended: false,
  rating: 0,
};

export const reviewData = createSlice({
  name: NameSpace.movies,
  initialState,
  reducers: {
    loadComments: (state, action) => {
      state.comments = action.payload;
      state.isCommentLoaded = true;
    },
    commentSended: (state, action) => {
      state.isCommentSended = action.payload;
    },
  },
});

export const { loadComments, commentSended } = reviewData.actions;
