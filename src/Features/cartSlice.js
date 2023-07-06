import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
  },
  reducers: {
    addToCarts: (state, action) => {
      state.carts.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const product = state.carts.find((item) => item.id === id);
      if (product) {
        product.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const product = state.carts.find((item) => item.id === id);
      if (product && product.quantity > 0) {
        product.quantity--;
      }
    },

    updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.carts.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
  },
});

export const { addToCarts, increaseQuantity, decreaseQuantity, removeFormCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
