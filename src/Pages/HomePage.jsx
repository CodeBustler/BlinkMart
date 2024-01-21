import React, { useContext, useEffect } from "react";
import { MyContext } from "../App";
import { scrollToTop } from "../components/Utilities/RequiredFunctions";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Utilities/Loader";
// ------------------------------------------------------

function HomePage() {
	const { allProducts, loading } = useContext(MyContext);

	useEffect(() => {
		scrollToTop();
	}, []);

	// ------------------------------------------------------
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container mx-auto ">
					<div className="flex flex-wrap justify-center  gap-5">
						{/*MAPPING PRODUCTS*/}
						{allProducts.map((item, index) => (
							<ProductCard key={index} item={item} />
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default HomePage;
