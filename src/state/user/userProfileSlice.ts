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
  createdAt: null,
  updatedAt: null,
}

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload !== null) {
          state.id = action.payload.id;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email;
          state.phoneNumber = action.payload.phoneNumber;
          state.roleName = action.payload.roleName;
          state.roleValue = action.payload.roleValue;
          state.profilePhotoUrl = action.payload.profilePhotoUrl;
          state.clinicId = action.payload.clinicId;
          state.createdAt = action.payload.createdAt;
          state.updatedAt = action.payload.updatedAt;
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