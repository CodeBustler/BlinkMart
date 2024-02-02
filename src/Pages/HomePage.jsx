import React, { useContext } from "react";
import hero from "../assets/desktop_hero/hero1.jpg";
import CategoryContainer from "../components/ProductCard/CategoryContainer";
import ImageSlider from "../components/Utilities/ImageSlider";
import { MyContext } from "../App";

function HomePage() {
	const { allProducts } = useContext(MyContext);
	const mobiles = allProducts.filter(
		(product) => product.subCategory === "mobiles",
	);

	const laptops = allProducts.filter(
		(product) => product.subCategory === "laptops",
	);

	const tablets = allProducts.filter(
		(product) => product.subCategory === "tablets",
	);

	const smartwatches = allProducts.filter(
		(product) => product.subCategory === "smart_watches",
	);

	const mensShirts = allProducts.filter(
		(product) => product.subCategory === "mens_shirts",
	);
	return (
		<div className="bg-gray-200">
			<ImageSlider />
			<div className="container mx-auto relative -top-28 p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					<CategoryContainer title={"Mobiles"} category={mobiles} />
					<CategoryContainer
						title={"Smart Watches"}
						category={smartwatches}
					/>
					<CategoryContainer title={"Tablets"} category={tablets} />
					<CategoryContainer title={"Laptops"} category={laptops} />
					<CategoryContainer
						title={"Men's Shirts & T-Shirts"}
						category={mensShirts}
					/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
