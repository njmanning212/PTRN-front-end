import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile } from "../../types/models";

import * as authService from '../../services/authService';

interface UserState {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  roleValue: number;
  profilePhotoUrl: string | null;
  clinicId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: UserState = {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload) {
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
      .addCase(fetchUserAsync.fulfilled, (state, action: PayloadAction<Profile | null>) => {
        if (action.payload) {
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
  }
})

export const setUserAsync = createAsyncThunk(
  'user/setUserAsync',
  async () => {
    const currentUser = await authService.getUserProfile();
    return currentUser;
  }
)

export const fetchUserAsync = createAsyncThunk(
  'user/fetchUserInitialData',
  async () => {
    const currentUser = await authService.getUserProfile();
    return currentUser;
  }
)

export default userSlice.reducer