import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
//-----------------------------------------------

// CONFIGURE REDUX STORE
const store = configureStore({
	reducer: { cart: cartSlice }, // SET CART SLICE AS REDUCER
	devTools: true, // ENABLE REDUX DEVTOOLS
});

export { store };
