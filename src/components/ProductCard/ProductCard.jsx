import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import {
	// FUNCTIONS
	numberWithCommas,
	scrollToTop,
	toastAddedToCart,
	toastLoginToAddCart,
	calculateDiscountPercentage,
} from "../Utilities/RequiredFunctions";
// ICONS
import tickIcon from "../../assets/tick_icon.png";
import noImage from "../../assets/no_image.png";
import { MdStar, MdStarBorder } from "react-icons/md";
// REDUX & ROUTER
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
// ------------------------------------------------------

function ProductCard({ item }) {
	const { handleCartAnimate, setItemInCart, cartItemsRX } =
		useContext(MyContext);
	const [itemInCart, setLocalItemInCart] = useState("Add To Cart");
	const navigateTo = useNavigate();
	const dispatch = useDispatch();
	// ------------------------------------------------------

	// ------------------------------------------------------
	// ******************* CART RELATED *******************
	// ------------------------------------------------------
	useEffect(() => {
		// CHECKS ITEM IS ALREADY IN CART
		const isItemInCart = cartItemsRX.some((cItem) => cItem.id === item.id);

		// UPDATE CARD BUTTON TEXT BASED ON "isItemInCart"
		setLocalItemInCart(isItemInCart ? "In Basket" : "Add To Cart");
	}, [cartItemsRX, item.id]);

	// ADDING CARD TO REDUX CART STORE
	const addCart = () => {
		const user = localStorage.getItem("user");
		if (user) {
			// CHECK DUPLICATE ITEM IN CART (STORE
			const isItemInCart = cartItemsRX.some(
				(cItem) => cItem.id === item.id,
			);
			if (isItemInCart) {
				setItemInCart("In Basket");
			} else {
				// ADDING TO CART_STORE
				setLocalItemInCart("Adding");
				dispatch(
					addToCart(item, () => setLocalItemInCart("In Basket")),
					toastAddedToCart(),
				);
				handleCartAnimate();
			}
		} else {
			navigateTo("/login");
			toastLoginToAddCart();
		}
	};

	// -------------------------------------------------------
	// ******************* OTHER FUNCTIONS *******************
	// -------------------------------------------------------

	// DISCOUNT PERCENTAGE
	const discountPercentage = calculateDiscountPercentage(item);

	// -------------------------------------------------------

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
