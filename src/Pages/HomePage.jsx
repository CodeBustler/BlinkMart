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

	return (
		<div className="bg-gray-200">
			<ImageSlider />
			<div className="container mx-auto relative -top-28 p-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					<CategoryContainer title={"Mobiles"} category={mobiles} />
					<CategoryContainer title={"Laptops"} category={laptops} />
					<CategoryContainer title={"Tablets"} category={tablets} />
					<CategoryContainer title={"Mens Shirts"} category={"d"} />
					<CategoryContainer
						title={"Women's Fashion"}
						category={"d"}
					/>
					<CategoryContainer
						title={"Women's Fashion"}
						category={"d"}
					/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
