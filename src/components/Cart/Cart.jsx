import React, { useContext } from "react";
import { MyContext } from "../../App";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebase";
import {
	toastItemRemoved,
	toastClearCart,
} from "../Utilities/RequiredFunctions";
// ---------------------------------------------------------------

function Cart() {
	const { userCartDetails, fetchUserCart, userUID } = useContext(MyContext);

	// ------------------------------------------------------
	// ***************** DELETE CART ITEM *****************
	// ------------------------------------------------------
	const removeFromCart = async (productId) => {
		console.log(productId);
		console.log(userUID);
		try {
			await deleteDoc(doc(fireDB, userUID, productId));
			await fetchUserCart(); // UPDATE CART STATE
			toastItemRemoved(); // SUCCESS MESSAGE
		} catch (error) {
			if (error.code === "firestore/not-found") {
				console.warn("Product not found in cart");
			} else {
				console.error("Error deleting document: ", error);
			}
		}
	};

	// ------------------------------------------------------
	// ************ DELETE ALL CART ITEMS ************
	// ------------------------------------------------------
	const clearCart = async () => {
		try {
			const isConfirmed = window.confirm(
				"Do you want to clear the cart ?",
			);

			if (isConfirmed) {
				// FETCH ALL DOCUMENTS
				const cartDocsRef = await getDocs(collection(fireDB, userUID));

				// ITERATE & DELETE EACH DOC
				const deletionPromises = cartDocsRef.docs.map(async (doc) => {
					await deleteDoc(doc.ref);
				});

				// WAIT FOR ALL DELETION TO COMPLETE
				await Promise.all(deletionPromises);
				await fetchUserCart(); // UPDATE CART STATE
				toastClearCart(); // SUCCESS MESSAGE
			} else {
				console.log("Clear cart operation canceled by user.");
			}
		} catch (error) {
			console.error("Error deleting all cart items: ", error);
		}
	};

	// ------------------------------------------------------
	// ***************** HANDLE COUNTER *****************
	// ------------------------------------------------------

	// INCREASE COUNT +
	const handleIncreaseCount = async (item) => {
		const newQuantity = item.quantity + 1;
		try {
			await updateDoc(doc(fireDB, userUID, item.docId), {
				quantity: newQuantity,
			});
			console.log(newQuantity);
			await fetchUserCart();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	};

	// DECREASE COUNT -
	const handleDecreaseCount = async (item) => {
		if (item.quantity === 1) {
			return;
		}
		const newQuantity = item.quantity - 1;
		try {
			await updateDoc(doc(collection(fireDB, userUID), item.docId), {
				quantity: newQuantity,
			});
			await fetchUserCart();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	};

	// ---------------------------------------------------------------
	return (
		<>
			<button onClick={clearCart}>Clear All Items</button>
			<div>
				{userCartDetails?.map((item, index) => (
					<div key={index} className="flex  gap-5">
						<div
							onClick={() => handleIncreaseCount(item)}
							className="cursor-pointer"
						>
							+
						</div>
						{item.quantity}{" "}
						<div onClick={() => handleDecreaseCount(item)}>-</div>
						<span onClick={() => removeFromCart(item.docId)}>
							X
						</span>
					</div>
				))}
			</div>
		</>
	);
}

export default Cart;
