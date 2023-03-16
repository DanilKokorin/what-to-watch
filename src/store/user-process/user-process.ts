import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../constants';
import { UserProcess } from '../../types/slices';
// import { UserProcess } from '../../types/state';

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  user: '',
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authStatus = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { requireAuthorization, setUser } = userProcess.actions;
