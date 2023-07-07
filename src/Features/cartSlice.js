import { addToLocal, getLocal } from './localStorage';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: getLocal() || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { item, quantity } = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem.item.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id: item.id, item, quantity });
      }
      addToLocal(state.items);
    },

    updateItem: (state, action) => {
      const updatedItems = action.payload;

      state.items = updatedItems.filter((item) => item.quantity > 0);
      addToLocal(state.items);
    },
  },
});

export const { addItem, updateItem } = cartSlice.actions;
export default cartSlice.reducer;
