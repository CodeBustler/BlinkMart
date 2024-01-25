import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { scrollToTop } from "../components/Utilities/RequiredFunctions";
import ProductCard from "../components/ProductCard/ProductCard";
import Loader from "../components/Utilities/Loader";
import { FaAnglesLeft } from "react-icons/fa6";

// ------------------------------------------------------

function HomePage() {
	const { allProducts, loading } = useContext(MyContext);
	const [scrollTop, setScrollTop] = useState(0);

	// HANDLE TAP TO TOP ICONS
	const handleScroll = () => {
		setScrollTop(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		//WHEN COMPONENT UNMOUNTS
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};

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
			{scrollTop > 700 && (
				<FaAnglesLeft
					className="rotate-90 w-10 h-10 bg-orange-500 p-3 rounded-full shadow-xl fixed bottom-10 right-10 z-50 cursor-pointer text-white opacity-40 hover:opacity-100 hover:scale-125 transition"
					onClick={scrollToTop}
				/>
			)}
		</>
	);
}

export default HomePage;
