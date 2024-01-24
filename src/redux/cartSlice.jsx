// import { createSlice } from "@reduxjs/toolkit";

// // INITIAL STATE FOR THE CART
// const initialState = [];

// // REDUX SLICE FOR MANAGING CART STATE
// const cartSlice = createSlice({
// 	name: "cart",
// 	initialState,
// 	reducers: {
// 		//-----------------------------------------------------
// 		// ******** ACTION TO ADD AN ITEM TO THE CART *********
// 		//-----------------------------------------------------
// 		addToCart: (state, action) => {
// 			const itemToAdd = action.payload;

// 			// CHECK IF THE ITEM IS ALREADY IN THE CART
// 			const isInCart = state.some(
// 				(cartItem) => cartItem.id === itemToAdd.id,
// 			);

// 			// ADD THE ITEM TO THE CART IF NOT ALREADY PRESENT
// 			if (!isInCart) {
// 				state.push(itemToAdd);
// 			} else {
// 				console.log("%c Item is already in the cart", "color:red");
// 			}
// 		},

// 		// -----------------------------------------------------------
// 		// ********* ACTION TO DELETE AN ITEM FROM THE CART *********
// 		// -----------------------------------------------------------
// 		deleteFromCart: (state, action) => {
// 			return state.filter((item) => item.id != action.payload.id);
// 		},

// 		// -----------------------------------------------------------
// 		// ************** ACTION TO EMPTY THE CART *******************
// 		// -----------------------------------------------------------
// 		emptyCartStore: (state, action) => {
// 			return [];
// 		},
// 	},
// });

// export const { addToCart, deleteFromCart, emptyCartStore } = cartSlice.actions;
// export default cartSlice.reducer;
