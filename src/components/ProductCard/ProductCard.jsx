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
// ROUTER
import { useNavigate } from "react-router-dom";
// FIREBASE
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebase";
// ------------------------------------------------------

function ProductCard({ item }) {
	const {
		handleCartAnimate,
		setItemInCart,
		userUID,
		fetchUserCart,
		userCartDetails,
	} = useContext(MyContext);
	const [itemInCart, setLocalItemInCart] = useState("Add To Cart");
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const navigateTo = useNavigate();

	// ------------------------------------------------------
	// ******************* GET USER CART *******************
	// ------------------------------------------------------
	useEffect(() => {
		// CHECKS ITEM IS ALREADY IN CART
		const isItemInCart = userCartDetails.some(
			(cItem) => cItem.id === item.id,
		);

		// UPDATE CARD BUTTON TEXT BASED ON "isItemInCart"
		setLocalItemInCart(isItemInCart ? "In Basket" : "Add To Cart");
	}, [userCartDetails, item.id]);

	// ------------------------------------------------------
	// ******************* ADD TO CART *******************
	// ------------------------------------------------------
	const addCart = async (e) => {
		e.preventDefault();
		e.target.disabled = true;

		// Prevent multiple clicks while processing
		if (isAddingToCart) {
			return;
		}

		try {
			setIsAddingToCart(true);
			e.target.disabled = true;

			const user = localStorage.getItem("user");

			if (user) {
				const isItemInCart = userCartDetails.some(
					(cItem) => cItem.id === item.id,
				);

				if (isItemInCart) {
					setItemInCart("In Basket");
				} else {
					const docRef = await addDoc(
						collection(fireDB, userUID),
						item,
					);
					fetchUserCart();
					console.log("Product added to user cart");
					toastAddedToCart();
					handleCartAnimate();
				}
			} else {
				navigateTo("/login");
				toastLoginToAddCart();
			}
		} catch (error) {
			console.error("Error adding document: ", error);
		} finally {
			setIsAddingToCart(false);
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
				<div className="font-bold hover:underline cursor-default mt-1 capitalize">
					{item.title}
				</div>
				<button
					className={`bg-orange-400 border active:bg-white active:border-gray-400  w-full py-1 mt-2 font-semibold rounded transition  ${
						itemInCart === "In Basket"
							? "bg-white  border-gray-400 "
							: "bg-orange-400 border-transparent active:bg-orange-300"
					}`}
					onClick={(e) => addCart(e)}
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
