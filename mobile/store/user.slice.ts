import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { login, register, userInfoGet } from '../api/user';
import { IUser, UserRole } from '../src/common/types';

import { RootState } from '.';

export interface IUserSlice {
  user: IUser;
  accessToken: string;
  authLoading: boolean;
  authError?: string;
}

const initialState: IUserSlice = {
  user: {
    _id: '',
    displayName: '',
    userName: '',
    email: '',
    role: UserRole.Regular,
  },
  accessToken: '',
  authLoading: false,
  authError: '',
};

export const userSignIn = createAsyncThunk('user/login', async (body: { email: string; password: string }) => {
  const { access_token } = await login(body);
  const user = await userInfoGet(access_token);
  console.log(user);
  return { user, access_token };
});

export const userSignUp = createAsyncThunk('user/register', async (body: { email: string; password: string }) => {
  return (await register(body)) as { user: IUser; access_token: string };
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN states
      .addCase(userSignIn.pending, (state) => {
        state.authLoading = true;
        state.authError = '';
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.user = { ...action.payload.user };
        state.authLoading = false;
        state.authError = '';
      })
      .addCase(userSignIn.rejected, (state, action) => {
        console.log(action.error);
        state.authLoading = false;
        state.authError = action.error.message;
      })
      // REGISTER states
      .addCase(userSignUp.pending, (state) => {
        state.authLoading = true;
        state.authError = '';
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.user = { ...action.payload.user };
        state.authError = '';
        state.authLoading = false;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        console.log(action.error.message);
        state.authLoading = false;
        state.authError = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.accessToken;
export const seletctUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
