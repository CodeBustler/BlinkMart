// IMPORT REDUX FUNCTIONALITY
import { configureStore } from "@reduxjs/toolkit";
// IMPORT REDUX CART SLICE
import cartSlice from "./cartSlice";

// CONFIGURE REDUX STORE
const store = configureStore({
	reducer: { cart: cartSlice }, // SET CART SLICE AS REDUCER
	devTools: true, // ENABLE REDUX DEVTOOLS
});

export { store };
