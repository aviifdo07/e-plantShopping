import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx'; // match your file extension

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
