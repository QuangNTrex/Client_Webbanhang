// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
        let added = false;
        const productID = action.payload.productID;
        const quantity = action.payload.quantity;  
        state.cart = state.cart.map(item => {
            added = added || productID === item.productID;
            return {productID: item.productID, quantity: item.quantity + (productID === item.productID && quantity)}
        })
        if(!added) state.cart = [...state.cart, {productID, quantity}];
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteProduct(state, action) {
        const productID = action.payload.productID; 
        state.cart = state.cart.filter(item => item.productID !== productID);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }
});

export const { addProduct, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
