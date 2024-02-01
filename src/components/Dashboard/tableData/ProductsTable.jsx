import React, { useContext, useEffect, useState } from "react";
import AddProduct from "../AddProduct";
import { MyContext } from "../../../App";
import {
	calculateDiscountPercentage,
	numberWithCommas,
	scrollToTop,
	toastProductDelete,
} from "../../Utilities/RequiredFunctions";
// ICONS
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoImages } from "react-icons/io5";
// FIREBASE
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../firebaseConfig/firebase";
// ROUTER
import { Link, useNavigate } from "react-router-dom";
// ----------------------------------------------------------------

function ProductsTable({ setSearchBarFocus }) {
	const { allProducts, fetchProducts } = useContext(MyContext);
	const [isRemovigItem, setRemovingItem] = useState();
	const [searchErrorADMIN, setSearchErrorADMIN] = useState("");
	const [searchDataADMIN, setSearchDataADMIN] = useState([]);
	const [searchKeywordADMIN, setSearchKeywordADMIN] = useState("");

	const navigateTo = useNavigate();

	// -------------------------------------------------------
	// ************** HANDLING SEARCHBAR RESULT ***************
	// -------------------------------------------------------

	// DEBOUNCED SEARCH FUNCTION
	let debounceTimer;
	const debouncedSearch = (query) => {
		clearTimeout(debounceTimer);

		// SETTING TIMEOUT FOR DELAYED SEARCH
		debounceTimer = setTimeout(() => {
			const lowerCaseQuery = query.toLowerCase();

			if (lowerCaseQuery.length <= 0) {
				setSearchDataADMIN(allProducts); // RESET RESULTS
				setSearchBarFocus(false);
				return;
			}
			setSearchBarFocus(true);

			const filteredProducts = allProducts.filter(
				(product) =>
					product.keywords.includes(lowerCaseQuery) ||
					product.title.includes(lowerCaseQuery) ||
					product.category.includes(lowerCaseQuery) ||
					product.subCategory.includes(lowerCaseQuery) ||
					product.price.includes(lowerCaseQuery) ||
					product.brand.includes(lowerCaseQuery),
			);

			// SET ERROR MESSAGE IF NO RESULTS FOUND
			setSearchErrorADMIN("");
			if (lowerCaseQuery.length > 0 && filteredProducts.length === 0) {
				setSearchErrorADMIN("No Result found !");
			}

			// SET SEARCH RESULTS AND SCROLL TO TOP
			setSearchDataADMIN(filteredProducts);
			scrollToTop();
		}, 300); // DELAY TIMER
	};

	useEffect(() => {
		// CALL DEBOUNCED SEARCH FUNCTION
		debouncedSearch(searchKeywordADMIN);

		// CLEANUP FUNCTION TO CLEAR THE TIMEOUT WHEN
		// - COMPONENT UNMOUNTS OR DEPENDENCIES CHANGE
		return () => {
			clearTimeout(debounceTimer);
		};
	}, [searchKeywordADMIN, allProducts]);

	console.log(searchDataADMIN);

	// ----------------------------------------------------------------
	//  **************** DELETE PRODUCT FROM FIREBASE ****************
	// ----------------------------------------------------------------
	const deleteFromDB = async (docId) => {
		if (isRemovigItem) {
			return;
		}

		try {
			// CHECK ADMIN PINCODE
			const env = await import.meta.env;
			let enteredPinNumber = Number(
				prompt("Please enter ADMIN PIN number !"),
			);
			const adminPinCode = Number(env.VITE_REACT_APP_PIN_CODE);

			if (enteredPinNumber === adminPinCode) {
				setRemovingItem(true);
				await deleteDoc(doc(fireDB, "allProducts", docId));
				await fetchProducts(); // UPDATE CART STATE
				toastProductDelete(); // SUCCESS MESSAGE
				scrollToTop();
			} else {
				alert("Invalid pin number");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setRemovingItem(false);
		}
	};

	// ----------------------------------------------------------------
	return (
		<>
			<div className="flex items-center justify-between bg-white sticky top-[64px] py-2 md:py-4 border-b-2 mb-5 z-20">
				<h2
					className={`text-xl font-bold my-3 text-center md:text-left hidden md:block`}
				>
					Product Dashboard
				</h2>

				<div className="flex items-center flex-row-reverse md:flex-row justify-between gap-5 w-full md:w-auto">
					<div className="flex items-center justify-between border border-2 border-purple-400 rounded-md  pl-4   ">
						<input
							type="text"
							placeholder="Search products"
							className="outline-none w-full "
							value={searchKeywordADMIN}
							onChange={(e) =>
								setSearchKeywordADMIN(e.target.value)
							}
							onFocus={() => setSearchBarFocus(true)}
							// onBlur={() => setSearchBarFocus(false)}
						/>
						<IoIosSearch className="text-4xl text-gray-300 my-1 mr-3 " />
					</div>
					<div className="flex  items-center gap-2">
						<Link
							to="/addProduct"
							className="w-10 h-10 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center "
							title="Add new product"
						>
							<FaPlusCircle className="scale-150 text-2xl text-purple-500" />
						</Link>
					</div>
				</div>
			</div>
			<small className="text-gray-500 py-1 bg-white px-3">
				{searchKeywordADMIN.length <= 0
					? "All Products"
					: `About ${searchDataADMIN.length} result `}
			</small>
			{/*CONTAINER */}
			<div className="mt-5">
				{searchDataADMIN.map((product, index) => {
					// DISCOUNT PERCENTAGE
					const discountPercentage =
						calculateDiscountPercentage(product);

					return (
						<div
							key={index}
							className=" flex  items-center justify-between border border-2 rounded-md mt-4 p-3 md:p-5 hover:shadow-lg hover:bg-gray-100 md:px-5"
						>
							{/*PRODUCT NAME & IMAGE*/}
							<div className="flex items-center gap-1 md:gap-5  md:min-w-[23%]">
								<div className="w-12 h-12  md:w-20 md:h-20 object-contain ">
									<img
										src={[product.img1]}
										alt="product_image"
										className="w-full h-full object-contain hover:scale-110 transition cursor-pointer"
										title="Tap to know more..."
									/>
								</div>
								<div className="">
									<div className="font-semibold capitalize">
										{product.title}
									</div>
									<div className="capitalize text-sm mt-1 text-gray-600">
										{product.subCategory.replace(/_/g, " ")}
									</div>
								</div>
							</div>

							{/*PRODUCT PRICE*/}
							<div className="hidden md:block md:min-w-[15%]">
								<div className="">
									<span className="font-semibold">
										Price :{" "}
									</span>
									<span>
										₹ {numberWithCommas(product.price)}
									</span>
								</div>
								<div className="text-left ">
									<span className="font-semibold">
										Actual Price :{" "}
									</span>
									<span>
										₹{" "}
										{numberWithCommas(product.actualPrice)}
									</span>
								</div>
							</div>
							<div className="font-bold text-green-500 hidden md:block ">
								% {discountPercentage} Off
							</div>

							<div className=" text-gray-500 mt-8 md:mt-0 hidden md:block md:min-w-[8%]">
								{product.price > 500
									? "FREE Delivery By BlinkMart"
									: "+ ₹20 Delivery Charges"}
							</div>

							<div className="flex items-center gap-2 md:gap-10 text-3xl ">
								<FaEdit
									className=" text-gray-400 cursor-pointer hover:scale-125 transition"
									title="Update Product Detail"
									onClick={() =>
										navigateTo(
											`/updateProduct/${product.id}`,
										)
									}
								/>
								<MdDeleteForever
									className="text-red-500 cursor-pointer hover:scale-125 transition md:text-4xl"
									title="Delete Product From Database"
									onClick={() => deleteFromDB(product.id)}
								/>
							</div>
						</div>
					);
				})}
				<div className="text-center font-semibold text-red-400 text-2xl mt-32 ">
					{searchErrorADMIN}
				</div>
			</div>
		</>
	);
}

export default ProductsTable;
