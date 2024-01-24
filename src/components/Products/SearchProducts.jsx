import { useContext } from "react";
import { MyContext } from "../../App";
// ---------------------------------------------------

function SearchProducts() {
	const { allProducts } = useContext(MyContext);
	// ---------------------------------------------------
	return (
		<>
			<div>SearchProducts</div>
		</>
	);
}

export default SearchProducts;
