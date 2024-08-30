import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
};
const configHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + token,
});

export enum UserRole {
  Regular = 'Regular',
  Admin = 'Admin',
}

export interface IUser {
  _id: string;
  displayName?: string;
  userName: string;
  email: string;
  role: UserRole;
}

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
  const loginResponse = await fetch(baseUrl + 'auth/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const { access_token } = await loginResponse.json();
  const infoResponse = await fetch(baseUrl + 'user/info', {
    headers: configHeaders(access_token),
  });
  const user = await infoResponse.json();
  return { user, access_token };
});

export const userSignUp = createAsyncThunk('user/register', async (body: { email: string; password: string }) => {
  const response = await fetch(baseUrl + 'auth/register', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return (await response.json()) as { user: IUser; access_token: string };
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
