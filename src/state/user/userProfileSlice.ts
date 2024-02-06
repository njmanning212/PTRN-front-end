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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload) {
          return {...state, ...action.payload}
        }
      })
  }
})

export const fetchUserProfileAsync = createAsyncThunk(
  'user/fetchUserInitialData',
  async () => {
    const currentUserProfile = await authService.getUserProfile();
    return currentUserProfile;
  }
)

export default userProfileSlice.reducer