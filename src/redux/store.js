// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import notfyReducer from './notifySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    notify: notfyReducer,
  }
});

export default store;
