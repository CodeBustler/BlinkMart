import React from "react";
import { useNavigate } from "react-router-dom";
import { numberWithCommas, scrollToTop } from "../Utilities/RequiredFunctions";
// ------------------------------------------------------

function ProductCard({ item, itemInCart, addCart }) {
	const navigateTo = useNavigate();
	// ------------------------------------------------------

	return (
		<div className="border border-gray-300 rounded-md p-5 transition bg-white  flex flex-col justify-between flex-shrink-0 h-[320px] w-[95%] md:w-[240px] hover:border-gray-400 hover:shadow-xl transition">
			{/* PRODUCT IMAGE */}
			<img
				src={item?.img1 || no_image}
				alt="product-image"
				className="object-contain w-[100%] h-[60%] cursor-pointer transition hover:scale-105 block"
				title="Tap to know more..."
				onClick={() => {
					navigate(`/ProductDetail/${item.id}`);
					scrollToTop();
				}}
			/>
			{/* PRODUCT DETAILS */}
			<div className="flex flex-col gap-1">
				<div className="font-bold text-xl text-gray-500">
					₹ {numberWithCommas(item.price)}
				</div>
				<div className="font-bold hover:underline cursor-default">
					{item.title}
				</div>

				<button
					className={`bg-orange-400 border  w-full py-1 mt-3 font-semibold rounded  transition ${
						itemInCart === "In Basket"
							? "bg-white  border-gray-400 "
							: "bg-orange-400 border-transparent active:bg-orange-300"
					}`}
					onClick={addCart}
				>
					{itemInCart === "In Basket" ? (
						<div className="flex items-center justify-center gap-3">
							<img
								src={tickIcon}
								alt=""
								className="w-[14px] md:w-[8%] scale-125"
							/>
							{itemInCart}
						</div>
					) : (
						itemInCart
					)}
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
