import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
const headers = {
  "Content-Type": "application/json",
};

export enum UserRole {
  Regular = "Regular",
  Admin = "Admin",
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
    _id: "",
    displayName: "",
    userName: "",
    email: "",
    role: UserRole.Regular,
  },
  accessToken: "",
  authLoading: false,
  authError: "",
};

export const userSignIn = createAsyncThunk(
  "user/login",
  async (body: { email: string; password: string }) => {
    const user = await fetch(baseUrl + "auth/login", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return (await user.json()) as { access_token: string };
  },
);

export const userSignUp = createAsyncThunk(
  "user/register",
  async (body: { email: string; password: string }) => {
    const response = await fetch(baseUrl + "auth/register", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    return (await response.json()) as { user: IUser; access_token: string };
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN states
      .addCase(userSignIn.pending, (state) => {
        state.authLoading = true;
        state.authError = "";
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.authLoading = false;
        state.authError = "";
      })
      .addCase(userSignIn.rejected, (state, action) => {
        console.log(action.error.message);
        state.authLoading = false;
        state.authError = action.error.message;
      })
      // REGISTER states
      .addCase(userSignUp.pending, (state) => {
        state.authLoading = true;
        state.authError = "";
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        console.log(action.payload);
        state.accessToken = action.payload.access_token;
        state.user = { ...action.payload.user };
        state.authError = "";
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

export default userSlice.reducer;
