import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const itemToAdd = action.payload;
			const isInCart = state.some(
				(cartItem) => cartItem.id === itemToAdd.id,
			);

			if (!isInCart) {
				state.push(itemToAdd);
			} else {
				console.log("%c Item is already in the cart", "color:red");
			}
		},
		deleteFromCart: (state, action) => {
			return state.filter((item) => item.id != action.payload.id);
		},
		emptyCartStore: (state, action) => {
			return [];
		},
	},
});

export const { addToCart, deleteFromCart, emptyCartStore } = cartSlice.actions;
export default cartSlice.reducer;
