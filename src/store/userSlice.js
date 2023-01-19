import { createSlice } from '@reduxjs/toolkit';
import { userLogIn, userUpdate, registration, userRemember } from '../service/apiService';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: null,
    error: null,
    errorMessage: {},
  },
  reducers: {
    logOutUser(state) {
      state.userData = null;
      state.status = null;
      state.error = null;
    },
    errorNull(state) {
      state.error = null;
      state.errorMessage = {};
    },
  },
  extraReducers: {
    [registration.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [registration.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved';
        state.userData = action.payload.user;
        return;
      }
      if (action.payload.errors) {
        state.status = 'rejected';
        state.errorMessage = action.payload.errors;

        let errStatus = '';

        if (action.payload.errors.error) {
          errStatus += action.payload.errors.error.status;
        } else {
          const errArr = Object.entries(action.payload.errors);

          errArr.forEach((item) => {
            errStatus += `${item[0]}: ${item[1]} `;
          });
        }
        state.error = errStatus;
      }
    },
    [registration.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.errorMessage = action.payload.errors;
    },
    [userLogIn.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [userLogIn.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved';
        state.userData = action.payload.user;
        return;
      }
      if (action.payload.errors) {
        state.status = 'rejected';

        state.errorMessage = action.payload.errors;

        let errStatus = '';

        if (action.payload.errors.error) {
          errStatus += action.payload.errors.error.status;
        } else {
          const errArr = Object.entries(action.payload.errors);
          errStatus = `${errArr[0][0]}: ${errArr[0][1]}`;
        }
        state.error = errStatus;
      }
    },
    [userLogIn.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.errorMessage = action.payload.errors;
    },
    [userRemember.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [userRemember.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userData = action.payload.user;
    },
    [userRemember.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [userUpdate.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [userUpdate.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.status = 'resolved';
        state.userData = action.payload.user;
        return;
      }
      if (action.payload.errors) {
        state.status = 'rejected';
        state.errorMessage = action.payload.errors;
      }
    },
    [userUpdate.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
      state.errorMessage = action.payload.errors;
    },
  },
});

export const { logOutUser, errorNull } = userSlice.actions;

export default userSlice.reducer;
