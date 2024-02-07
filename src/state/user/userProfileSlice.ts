import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../types/models";

import * as authService from '../../services/authService';

const initialState: Profile | null = null

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload !== null) {
          return action.payload
        }
      })

      .addCase(logoutUserAsync.fulfilled, () => {
        return initialState;
      });
  }
})

export const fetchUserProfileAsync = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async () => {
    const currentUserProfile = await authService.getUserProfile();
    return currentUserProfile;
  }
)

export const logoutUserAsync = createAsyncThunk(
  'userProfile/logoutUser',
  async () => {
    await authService.logout();
  }
)

export default userProfileSlice.reducer