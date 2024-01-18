import { useContext, useEffect, useState } from "react";
import { numberWithCommas, scrollToTop } from "../utilities/RequiredFunctions";
import { MyContext } from "../../App";
import Loader from "../Utilities/Loader";

// ------------------------------------------------------

function Cart() {
	const { loading, setLoading, userCartItems, userCartItemsCount } =
		useContext(MyContext);

	// ------------------------------------------------------

	return (
		<div>{loading ? <Loader /> : <div>{userCartItems.length}</div>}</div>
	);
}

export default Cart;
