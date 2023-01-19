import { createSlice } from '@reduxjs/toolkit';
import { getArticles } from '../service/apiService';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    currentPage: 1,
    maxPages: null,
    status: null,
    error: null,
    sortText: false,
  },
  reducers: {
    paginationChange(state, action) {
      state.currentPage = action.payload;
    },
    sortingText(state, action) {
      state.sortText = action.payload;
    },
  },
  extraReducers: {
    [getArticles.pending]: (state, action) => {
      state.articles = [];
      state.status = 'loading';
      state.error = null;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.error = null;

      state.articles = action.payload.articles;
      state.maxPages = Math.ceil(action.payload.articlesCount / 5);
    },
    [getArticles.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});
export const { paginationChange, sortingText } = articleSlice.actions;
export default articleSlice.reducer;
