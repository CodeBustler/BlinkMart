import { useRef } from "react";
import { numberWithCommas, scrollToTop } from "../utilities/RequiredFunctions";
// ROUTER
import { useNavigate } from "react-router-dom";
// ICONS
import { FaAngleLeft } from "react-icons/fa";
import { IoMdArrowDroprightCircle } from "react-icons/io";
// -------------------------------------------------------------------

function ContainerForCard({ containerTitle, filterProducts, children }) {
	const containerRef = useRef(null);
	const navigateTo = useNavigate();

	// ----------------------------------------------------------------
	// **************** CONTAINER SCROLL FUNCTIONS *******************
	// ----------------------------------------------------------------
	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft -= 500;
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft += 500;
		}
	};

	// ----------------------------------------------------------------
	return (
		<div className="flex flex-col gap-10 md:mx-8 mt-10 ">
			{/*CONTAINER*/}
			<div className="relative bg-gray-100 p-5 md:p-8 rounded-xl border">
				<div className=" flex justify-between text-2xl mt-3 md:mt-0 mb-0 font-semibold capitalize ">
					<h2>{containerTitle?.replace(/_/g, " ")}</h2>
					<IoMdArrowDroprightCircle
						className="sticky  md:block text-3xl text-orange-500 cursor-pointer hover:scale-150 transition "
						onClick={() => {
							navigateTo(
								`/ProductsSubCategory/${filterProducts}`,
							);
							scrollToTop();
						}}
					/>
				</div>
				<div
					className="overflow-x-hidden scroll-smooth "
					ref={containerRef}
				>
					<div className="flex flex-col items-center mt-8 md:flex-row gap-8">
						{children}
					</div>
				</div>
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
			</div>
		</div>
	);
}

export default ContainerForCard;
