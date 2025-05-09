// src/redux/notifySlide.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: "",
  state: "SUC",
  time: 3000,
  exp: { ERR: { bgc: "red", col: "white", state: "ERR" }, WAR: { bgc: "yellow", col: "black", state: "WAR" }, SUC: { bgc: "green", col: "white", state: "SUC" } }
};

const notifySlide = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    pushNotify(state, action) {
      state.title = action.payload.title;
      state.state = action.payload.state || "SUC";
      state.time = action.payload.time || 3000;
    },
    deleteNotify(state, action) {
      state.title = "";
    }
  }
});

export const { pushNotify, deleteNotify } = notifySlide.actions;
export default notifySlide.reducer;
