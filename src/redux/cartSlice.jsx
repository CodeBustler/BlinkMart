import { createSlice } from "@reduxjs/tooklit";
import {
	toastItemRemoved,
	toastItemAlreadyInCart,
} from "../components/Utilities/RequiredFunctions";

// REDUX SLICE/REDUCER
const initialState = [];
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			const itemToAdd = action.payload;
			const isInCart = state.some(
				(cartItem) => cartItem.id === itemToAdd.id,
			);

			if (!isInCart) {
				state.push(itemToAdd);
			} else {
				toastItemAlreadyInCart();
				console.log("%c Item is already in cart", "color:tomato");
			}
		},
		deleteFromCart(state, action) {
			toastItemRemoved();
			return state.filter((item) => item.id != action.payload.id);
		},
		emptyCart(state, action) {
			return [];
		},
	},
});

export const { addToCart, deleteFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
