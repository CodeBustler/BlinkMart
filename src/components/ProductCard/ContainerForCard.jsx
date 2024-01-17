import React, { useContext, useRef } from "react";
import { MyContext } from "../../App";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { numberWithCommas, scrollToTop } from "../utilities/RequiredFunctions";

// ----------------------------------------------------------------------

function ContainerForCard({ categoryTitle, filterProducts, children }) {
	const containerRef = useRef(null);
	const navigateTo = useNavigate();

	const { allProducts, handleCartAnimate } = useContext(MyContext);

	// ----------------------------------------------------------------------
	// SCROLL CONTAINER FUNCTIONS
	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft -= 200;
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft += 200;
		}
	};

	const handleNavigate = (e) => {
		navigateTo(`/ProductsSubCategory/${categoryTitle}`);
		scrollToTop();
	};
	// ----------------------------------------------------------------------
	return (
		<div className="flex flex-col gap-10 md:mx-8 mt-10 ">
			{/*CONTAINER*/}
			<div className="relative bg-gray-100 p-5 md:p-8 rounded-xl border">
				<div className=" flex justify-between text-2xl mb-5 md:mb-7 font-semibold capitalize ">
					<div>{categoryTitle?.replace(/_/g, " ")}</div>
					<IoMdArrowDroprightCircle
						className="sticky hidden md:block text-3xl text-orange-500 cursor-pointer hover:scale-150 transition "
						onClick={(e) => handleNavigate(e)}
					/>
				</div>
				<div
					className="overflow-x-hidden scroll-smooth "
					ref={containerRef}
				>
					<div className="flex flex-col items-center md:flex-row gap-8">
						{children}
					</div>
				</div>
				{filterProducts?.length >= 3 ? (
					<div>
						<FaAngleLeft
							onClick={scrollLeft}
							className="absolute top-[25%] -left-10 border border-2 text-[32px]  px-2 h-[200px] text-gray-600 bg-gray-100 active:bg-gray-200 rounded-md hidden md:block cursor-pointer"
						/>

						<FaAngleLeft
							onClick={scrollRight}
							className="absolute -right-10 top-[25%] rotate-180 border border-2 text-[32px] px-2 h-[200px] text-gray-600 bg-gray-100 active:bg-gray-200 rounded-md hidden md:block cursor-pointer"
						/>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default ContainerForCard;
