import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../types/models";

import * as authService from '../../services/authService';

const initialState: Profile = {
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  roleName: '',
  roleValue: 0,
  profilePhotoUrl: null,
  clinicId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload) {
          return {...state, ...action.payload}
        }
      })
      .addCase(logoutUserAsync.fulfilled, () => {
        return initialState
      })
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
    return
  }
)

export default userProfileSlice.reducer