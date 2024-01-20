import { useContext, useEffect, useState } from "react";
import {
	numberWithCommas,
	scrollToTop,
	toastItemRemoved,
} from "../utilities/RequiredFunctions";
import { MyContext } from "../../App";
import Loader from "../Utilities/Loader";
import emptyCart from "../../assets/empty_cart.jpg";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { fireDB } from "../../firebaseConfig/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
// ------------------------------------------------------

function Cart() {
	const { loading, setLoading, userDB, cartItemsRX, userUID, currentUser } =
		useContext(MyContext);
	const [totalAmount, setTotalAmout] = useState(0);
	const [shippingCharge, setShippingCharge] = useState(0);
	const [specialOff, setSpecialOff] = useState(100);
	const [scrollY, setScrollY] = useState(0);
	const dispatch = useDispatch();
	console.log(currentUser);
	const [userCartDetails, setUserCartDetails] = useState({
		userCartProducts: [],
		userCartProductsCount: [],
	});
	const [productCounts, setProductCounts] = useState(
		cartItemsRX.map(() => 1), // Initialize counts for each item to 1
	);

	// ------------------------------------------------------

	// SETUP USER CART IN LOCAL-STATE
	useEffect(() => {
		setUserCartDetails((prevUserCart) => ({
			...prevUserCart,
			userCartProducts: cartItemsRX,
			userCartProductsCount: productCounts,
		}));
	}, [cartItemsRX, productCounts]);

	useEffect(() => {
		// DISPLAY TOTAL AMOUNT (MOBILE)
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
		// SCROLL TOP
		scrollToTop();
	}, []);

	// PRODUCT ITEMS COUNT
	const totalItems = productCounts.reduce(
		(total, element) => total + element,
		0,
	);

	// SUBTOTAL PRICE
	const subTotalPrice = cartItemsRX.reduce(
		(total, item, index) =>
			total + parseInt(item.price) * productCounts[index],
		0,
	);

	// ADD USER CART FIRESTORE
	let matchingUser = {};
	useEffect(() => {
		const updateUserCartFireStore = async () => {
			try {
				matchingUser = userDB?.find((user) => user.uid === userUID);

				// If matchingUser is undefined, set it to an empty object
				if (!matchingUser) {
					matchingUser = {};
				}
				if (matchingUser.id) {
					const userRef = doc(fireDB, "users", matchingUser.id);
					await updateDoc(userRef, {
						cart: userCartDetails,
					});

					console.log("User cart updated successfully!");
				} else {
					console.log("No matching user ID found.");
				}
			} catch (error) {
				console.error("Error updating user cart:", error);
			}
		};

		updateUserCartFireStore();
	}, [cartItemsRX, userCartDetails, productCounts]);

	// TOTAL PRICE
	useEffect(() => {
		// Calculate shipping charge based on totalAmount
		const shippingCharge = totalAmount > 500 ? 0 : 20;
		setShippingCharge(shippingCharge);
		setTotalAmout(subTotalPrice + shippingCharge - specialOff);
	}, [totalAmount, subTotalPrice]);

	// HANDLE PRODUCT COUNTER
	const handleProductCountMinus = (index) => {
		setProductCounts((prevCounts) =>
			prevCounts.map((count, i) =>
				i === index ? Math.max(count - 1, 1) : count,
			),
		);
	};

	const handleProductCountPlus = (index) => {
		setProductCounts((prevCounts) =>
			prevCounts.map((count, i) => (i === index ? count + 1 : count)),
		);
	};

	// DELETE ITEM FROM CART
	const deleteItem = (item, index) => {
		dispatch(deleteFromCart(item));
		// Remove the count for the deleted item
		setProductCounts((prevCounts) =>
			prevCounts.filter((_, i) => i !== index),
		);
		toastItemRemoved();
	};

	// ------------------------------------------------------

	return (
		<>
			{cartItemsRX.length === 0 ? (
				<div className="flex items-center flex-col gap-10 md:gap-14 justify-start mt-10 min-h-[90vh]">
					<img
						src={emptyCart}
						alt=""
						className="w-[50%] md:w-[18%] animate-pulse"
					/>
					<p className="text-2xl  md:text-3xl font-semibold">
						Your Cart is{" "}
						<span className="text-orange-500 ">Empty !</span>
					</p>
					<Link
						to="/"
						className="text-md md:text-lg font-semibold text-gray-900 bg-orange-500 px-8 py-3 rounded-3xl shadow-2xl hover:bg-orange-500 flex items-center gap-4"
					>
						<FaBagShopping /> Return to Shop
					</Link>
				</div>
			) : (
				<>
					<h1 className="text-2xl font-bold  text-center md:text-left mb-5 underline underline-heading underline-offset-4">
						Cart Items
					</h1>
					<div
						className={`md:hidden text-xl text-center py-2 bg-yellow-400 rounded-lg sticky top-[60px] z-10 shadow-xl cursor-pointer ${
							scrollY > 100 ? "block" : "hidden"
						}`}
						onClick={scrollToTop}
					>
						Total Amount :{" "}
						<span className="font-semibold">
							₹ {totalAmount ? numberWithCommas(totalAmount) : ""}{" "}
						</span>
					</div>
					<section className="">
						<div className="flex flex-col-reverse  md:flex-row items-center md:items-start justify-center p-1 md:p-5 ">
							<div className="w-full md:w-2/3 ">
								{cartItemsRX.map((item, index) => (
									<div
										key={item.id}
										className="md:w-[90%] p-5 mb-7 rounded-lg flex flex-col md:flex-row gap-8 relative items-center transition border bg-gray-100 hover:shadow-xl hover:border min-h-[280px] "
									>
										<img
											src={item.img1}
											alt="product"
											className="rounded-md cursor-pointer w-[60%] md:w-[150px] object-contain hover:scale-105 transition bg-white mt-5 md:mt-0"
											title="Tap to know more..."
											onClick={() => {
												navigate(
													`/ProductDetail/${item.id}`,
												);
												scrollToTop();
											}}
										/>
										<div className="flex flex-col justify-between ">
											<div className="">
												<div className="font-semibold text-xl mb-1">
													{item.title}
												</div>
												<small className="capitalize text-gray-400 px-3  pb-[3px] pt-[2px] bg-white rounded-xl ">
													{item.subCategory.replace(
														/_/g,
														" ",
													)}
												</small>
												<p className="mt-3 text-gray-500 first-letter:capitalize">
													{item.description.slice(
														0,
														200,
													)}
													...
												</p>
												<div className="font-semibold text-xl mt-3">
													₹{" "}
													{item.price
														? numberWithCommas(
																item.price,
														  )
														: ""}{" "}
													&nbsp;
													<small className="line-through text-gray-400">
														₹{" "}
														{item.actualPrice
															? numberWithCommas(
																	item.actualPrice,
															  )
															: ""}
													</small>
												</div>
											</div>
											<div className=" text-gray-400 mt-2 ">
												{item.price > 500
													? "FREE Delivery By BlinkMart"
													: "₹20 Delivery Charges | ₹500 <"}
											</div>
											<div className="flex items-center justify-between mt-5">
												<div className=" flex items-center justify-center  shadow-xl rounded-lg text-lg bg-orange-400">
													<FaMinus
														className=" cursor-pointer w-[35px] px-2"
														onClick={() =>
															handleProductCountMinus(
																index,
															)
														}
													/>
													<div className="px-6 bg-white select-none">
														{
															userCartDetails
																.userCartProductsCount[
																index
															]
														}
													</div>
													<FaPlus
														className=" cursor-pointer w-[35px] px-3"
														onClick={() =>
															handleProductCountPlus(
																index,
															)
														}
													/>
												</div>
												<MdDeleteForever
													className="text-4xl text-red-500 cursor-pointer hover:scale-125 transition"
													onClick={() =>
														deleteItem(item, index)
													}
												/>
											</div>
										</div>
									</div>
								))}
							</div>

							{/*BUY SECTION*/}
							<div className="border w-full md:w-1/3 p-6 rounded-lg bg-gray-100 shadow-xl hover:shadow-2xl transition mb-12 md:sticky md:top-[120px] select-none">
								<div className="flex justify-between text-lg font-semibold">
									<div className="">
										Subtotal ({totalItems} Items)
									</div>
									<div>
										₹{" "}
										{subTotalPrice
											? numberWithCommas(subTotalPrice)
											: ""}
									</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>Delivery Charge</div>
									<div>
										{totalAmount > 500 ? "Free" : "₹ 20"}
									</div>
								</div>
								<div className="flex justify-between mt-3">
									<div>Special ₹100 Off </div>
									<div>₹ 100</div>
								</div>
								<div className="mt-5 text-xl md:text-2xl font-bold flex justify-between">
									<span>Total Amount :</span>
									<div>
										{" "}
										₹{" "}
										{totalAmount
											? numberWithCommas(totalAmount)
											: ""}
									</div>
								</div>
								<div className="flex items-center mt-5">
									<input
										type="checkbox"
										className=" mr-2 h-5 w-5 cursor-pointer"
									/>
									<span>Send as a gift. Custom message </span>
								</div>
								<button className="rounded-lg text-center w-full mt-7 bg-orange-400 py-2 font-semibold">
									Proceed to Buy ({totalItems} Items)
								</button>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
}

export default Cart;
