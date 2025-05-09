// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: "1",
  username: "",
  name: "",

  email: 'abc@gmail.com',
  avatarUrl: "",
  role: 3,
  address: "",
  phoneNumber: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userID = action.payload.userID || action.payload.userId;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.role = action.payload.role;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.email = action.payload.email;

    },
    pushUser(state, action) {
      state.userID = action.payload.userID || action.payload.userId;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
      state.role = action.payload.role;
      state.address = action.payload.address;
      state.phoneNumber = action.payload.phoneNumber;
      state.email = action.payload.email;
      state.email = action.payload.email;

    },
    clearUser(state) {
      state.username = '';
      state.email = '';
      state.avatarUrl = '';
      state.role = ''
    }
  }
});

export const { setUser, pushUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
