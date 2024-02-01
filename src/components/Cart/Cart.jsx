import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { numberWithCommas, scrollToTop } from "../utilities/RequiredFunctions";
import { toastClearCart } from "../Utilities/RequiredFunctions";
import { toastItemRemoved } from "../Utilities/RequiredFunctions";
// FIREBASE
import { fireDB } from "../../firebaseConfig/firebase";
import { collection, doc } from "firebase/firestore";
import { deleteDoc, getDocs, updateDoc } from "firebase/firestore";
// ROUTER
import { Link, useNavigate } from "react-router-dom";
// ICONS
import { FaBagShopping } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import emptyCart from "../../assets/empty_cart.jpg";

// ---------------------------------------------------------------

function Cart() {
	const { userCartDetails, fetchUserCart, userUID } = useContext(MyContext);
	const [shippingCharge, setShippingCharge] = useState(0);
	const [specialOff, setSpecialOff] = useState(100);
	const [totalAmount, setTotalAmout] = useState(0);
	const [scrollY, setScrollY] = useState(0);
	const [isRemovigItem, setRemovingItem] = useState(false);
	const navigateTo = useNavigate();
	// ------------------------------------------------------
	// ***************** DELETE CART ITEM *****************
	// ------------------------------------------------------
	const removeFromCart = async (productId) => {
		if (isRemovigItem) {
			return;
		}

		try {
			setRemovingItem(true);
			await deleteDoc(doc(fireDB, userUID, productId));
			await fetchUserCart(); // UPDATE CART STATE
			toastItemRemoved(); // SUCCESS MESSAGE
			scrollToTop();
		} catch (error) {
			if (error.code === "firestore/not-found") {
				console.warn("Product not found in cart");
			} else {
				console.error("Error deleting document: ", error);
			}
		} finally {
			setRemovingItem(false);
		}
	};

	// ------------------------------------------------------
	// ************ DELETE ALL CART ITEMS ************
	// ------------------------------------------------------
	const clearCart = async () => {
		try {
			const isConfirmed = window.confirm(
				"Do you want to clear the cart ?",
			);

			if (isConfirmed) {
				// FETCH ALL DOCUMENTS
				const cartDocsRef = await getDocs(collection(fireDB, userUID));

				// ITERATE & DELETE EACH DOC
				const deletionPromises = cartDocsRef.docs.map(async (doc) => {
					await deleteDoc(doc.ref);
				});

				// WAIT FOR ALL DELETION TO COMPLETE
				await Promise.all(deletionPromises);
				await fetchUserCart(); // UPDATE CART STATE
				toastClearCart(); // SUCCESS MESSAGE
			} else {
				console.log("Clear cart operation canceled by user.");
			}
		} catch (error) {
			console.error("Error deleting all cart items: ", error);
		}
	};

	// ------------------------------------------------------
	// ***************** HANDLE COUNTER *****************
	// ------------------------------------------------------

	// INCREASE COUNT +
	const handleIncreaseCount = async (item) => {
		const newQuantity = item.quantity + 1;
		try {
			await updateDoc(doc(fireDB, userUID, item.docId), {
				quantity: newQuantity,
			});
			await fetchUserCart();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	};

	// DECREASE COUNT -
	const handleDecreaseCount = async (item) => {
		if (item.quantity === 1) {
			return;
		}
		const newQuantity = item.quantity - 1;
		try {
			await updateDoc(doc(collection(fireDB, userUID), item.docId), {
				quantity: newQuantity,
			});
			await fetchUserCart();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	};

	// ------------------------------------------------------
	// ***************** CALCULATE BILL *****************
	// ------------------------------------------------------

	// PRODUCT ITEMS COUNT
	const totalQuantity = userCartDetails.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	// SUBTOTAL PRICE
	const subTotalPrice = userCartDetails.reduce(
		(total, item, index) => total + parseInt(item.price) * item.quantity,
		0,
	);

	// TOTAL PRICE
	useEffect(() => {
		// Calculate shipping charge based on totalAmount
		const shippingCharge = totalAmount > 500 ? 0 : 20;
		setShippingCharge(shippingCharge);
		setTotalAmout(subTotalPrice + shippingCharge - specialOff);
	}, [totalAmount, subTotalPrice]);

	// DISPLAY TOTAL AMOUNT STICKY(MOBILE )
	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
		// SCROLL TOP
		scrollToTop();
	}, []);

	// ---------------------------------------------------------------
	return (
		<>
			{userCartDetails.length === 0 ? (
				<div className="flex items-center flex-col gap-10 md:gap-14 justify-start mt-10 min-h-[90vh] ">
					<img
						src={emptyCart}
						alt=""
						className="w-[50%] md:w-[18%] animate-pulse"
					/>
					<p className="text-2xl  md:text-3xl font-semibold">
						Your Cart is{" "}
						<span className="text-orange-400 ">Empty !</span>
					</p>
					<Link
						to="/"
						className="text-md md:text-lg font-semibold text-gray-900 bg-orange-400 px-8 py-3 rounded-3xl shadow-2xl active:bg-orange-300 flex items-center gap-4"
					>
						<FaBagShopping /> Return to Shop
					</Link>
				</div>
			) : (
				<>
					<div className="flex items-center  justify-between mb-5 p-4 ">
						<h1 className="underline underline-offset-8 underline-heading text-2xl font-bold my-3 text-center md:text-left capitalize">
							Cart Items
						</h1>
						<MdDeleteForever
							className="text-red-500 text-4xl cursor-pointer hover:scale-125 active:scale-110 transition"
							title="Empty Cart!"
							onClick={clearCart}
						/>
					</div>
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
						<div className="flex flex-col-reverse  md:flex-row items-center md:items-start justify-center p-1 px-5 ">
							<div className="w-full md:w-2/3 ">
								{userCartDetails.map((item, index) => (
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
												navigateTo(
													`/ProductDetail/${item.id}`,
												);
												scrollToTop();
											}}
										/>
										<div className="flex flex-col justify-between ">
											<div className="">
												<div className="font-semibold text-xl mb-1 capitalize">
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
														className=" cursor-pointer w-[35px] px-3 active:scale-150 transition"
														onClick={() =>
															handleDecreaseCount(
																item,
															)
														}
													/>
													<div className="px-6 bg-white select-none">
														{item.quantity}
													</div>
													<FaPlus
														className=" cursor-pointer w-[35px] px-3 active:scale-150 transition"
														onClick={() =>
															handleIncreaseCount(
																item,
															)
														}
													/>
												</div>
												{/*<small className="text-xl text-gray-700">
													{" "}
													{item.quantity > 1
														? "₹ " +
														  item.price *
																item.quantity
														: ""}
												</small>*/}
												<MdDeleteForever
													className="text-4xl text-red-500 cursor-pointer hover:scale-125 active:scale-90 transition "
													onClick={(e) =>
														removeFromCart(
															item.docId,
														)
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
										Subtotal ({totalQuantity} Items)
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
									Proceed to Buy ({totalQuantity} Items)
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
