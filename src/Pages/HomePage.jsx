import React from "react";
import hero from "../assets/desktop_hero/hero1.jpg";
import CategoryContainer from "../components/ProductCard/CategoryContainer";

function HomePage() {
	return (
		<>
			<div className="container mx-auto ">
				<div className="hidden lg:flex items-center justify-between flex-wrap gap-14">
					<CategoryContainer title={"Mobiles"} />
					<CategoryContainer title={"Laptops"} />
					<CategoryContainer title={"Women's Fashion"} />
				</div>
			</div>
		</>
	);
}

export default HomePage;
