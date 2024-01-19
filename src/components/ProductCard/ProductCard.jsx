import { useContext, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {
	numberWithCommas,
	scrollToTop,
	toastAddedToCart,
	toastLoginToAddCart,
} from "../Utilities/RequiredFunctions";
import tickIcon from "../../assets/tick_icon.png";
import noImage from "../../assets/no_image.png";
import { MdStar, MdStarBorder } from "react-icons/md";

// ------------------------------------------------------

function ProductCard({ item }) {
	const navigateTo = useNavigate();
	const [itemInCart, setLocalItemInCart] = useState("Add To Cart");

	const { handleCartAnimate } = useContext(MyContext);
	// ------------------------------------------------------

	const addCart = () => {
		const user = localStorage.getItem("user");
		if (user) {
			// // Check if the item is already in the cart
			// const isItemInCart = cartItems.some(
			// 	(cItem) => cItem.id === item.id,
			// );
			// if (isItemInCart) {
			// 	setItemInCart("In Basket");
			// } else {
			// 	// Use the callback form of setState
			// 	setLocalItemInCart("Adding");
			// 	dispatch(
			// 		addToCart(item, () => setLocalItemInCart("In Basket")),
			// 		toastAddedToCart(),
			// 	);
			// 	handleCartAnimate();
			// }
		} else {
			navigateTo("/login");
			toastLoginToAddCart();
		}
	};

	// DISCOUNT PERCENTAGE
	const calculateDiscountPercentage = () => {
		if (item && item.price && item.actualPrice) {
			const price = parseFloat(item.price);
			const actualPrice = parseFloat(item.actualPrice);

			const discount = ((actualPrice - price) / actualPrice) * 100;

			return discount.toFixed(0);
		}
		return "";
	};

	const discountPercentage = calculateDiscountPercentage();
	// ------------------------------------------------------

	return (
		<div className="group border border-gray-300 rounded-md p-5 transition bg-white flex flex-col justify-between flex-shrink-0 h-[330px] w-[95%] md:w-[240px] hover:border-gray-400 hover:shadow-xl transition relative ">
			{/*FLOAD ICON DISCOUNT PERCENTAGE*/}
			<div className="absolute group-hover:opacity-100 opacity-0 transition duration-300 absolute -top-2 -right-2 font-semibold flex items-center justify-center py-2 px-3 bg-yellow-400 rounded-full text-center shadow-xl z-10 text-sm ">
				{discountPercentage}% Off
			</div>
			{/* PRODUCT IMAGE */}
			<img
				src={item?.img1 || noImage}
				alt="product-image"
				className="object-contain w-[100%] h-[60%] cursor-pointer transition hover:scale-105 block z-0"
				title="Tap to know more..."
				onClick={() => {
					navigateTo(`/ProductDetail/${item.id}`);
					scrollToTop();
				}}
			/>
			{/* PRODUCT DETAILS */}
			<div className="flex flex-col mt-2 ">
				<div className="font-bold text-xl text-gray-500 flex items-center justify-between">
					₹ {numberWithCommas(item.price)}
				</div>
				<div className="font-bold hover:underline cursor-default mt-1">
					{item.title}
				</div>

				<button
					className={`bg-orange-400 border  w-full py-1 mt-2 font-semibold rounded transition  ${
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
								alt="tickIcon"
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
