import { useContext } from "react";
import { MyContext } from "../../App";
import ProductCard from "../ProductCard/ProductCard";

// ---------------------------------------------------

function SearchProducts() {
	const { allProducts, searchResult, searchError } = useContext(MyContext);
	// ---------------------------------------------------
	return (
		<>
			{searchResult.length > 0 ? (
				<div className="container mx-auto ">
					<small className="text-gray-400">
						About {searchResult.length} results
					</small>

					<div className="flex flex-wrap justify-center md:justify-start mt-3 gap-5">
						{/*MAPPING PRODUCTS*/}
						{searchResult.map((item, index) => (
							<ProductCard key={index} item={item} />
						))}
					</div>
				</div>
			) : (
				<div
					className={`text-center mt-10 text-xl font-semibold ${
						searchError === "Search for products"
							? "text-gray-400"
							: "text-red-400"
					}`}
				>
					🔍 {searchError}
				</div>
			)}
		</>
	);
}

export default SearchProducts;
