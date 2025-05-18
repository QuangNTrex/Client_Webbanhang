// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resizeProducts(state, action) {
      state.cart = action.payload.cartItems.map(cart => {
        return {
          product: cart.product,
          quantity: cart.quantity,
        }
      });
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    changeProduct(state, action) {
      const product = action.payload.product;
      const quantity = action.payload.quantity;
      const checked = action.payload.checked;
      state.cart = state.cart.map(item => {
        if (item.product.productID === product.productID) {
          return { checked, product, quantity };
        }
        else return item;
      })
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addProduct(state, action) {
      let added = false;
      const product = action.payload.product;
      const quantity = action.payload.quantity;
      state.cart = state.cart.map(item => {
        added = added || product.productID === item.product.productID;
        return { checked: item.checked, product: item.product, quantity: item.quantity + (product.productID === item.product.productID && quantity) }
      })
      if (!added) state.cart = [...state.cart, { product, quantity, checked: true }];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteProduct(state, action) {
      const productID = action.payload.productID;
      state.cart = state.cart.filter(item => item.product.productID !== productID);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state, action) {

      state.cart = []

    }
  }
});

export const { clearCart, resizeProducts, addProduct, deleteProduct, changeProduct } = cartSlice.actions;
export default cartSlice.reducer;
