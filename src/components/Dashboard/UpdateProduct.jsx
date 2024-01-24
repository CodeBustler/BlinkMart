import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import {
	scrollToTop,
	toastProductUpdated,
} from "../Utilities/RequiredFunctions";
import { IoMdSad } from "react-icons/io";
import NavbarForAdmin from "../Navbar/NavbarForAdmin";
// FIREBASE
import { collection, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebase";
import { useNavigate, useParams } from "react-router-dom";
// ------------------------------------------------------

function UpdateProduct() {
	const { fetchProducts } = useContext(MyContext);
	const [errorMsg, setErrorMsg] = useState("");
	const { allProducts } = useContext(MyContext);
	const { productId } = useParams();
	const filterProductToUpdate = allProducts.filter(
		(item) => item.id === productId,
	);
	const navigateTo = useNavigate();
	const editProduct = filterProductToUpdate[0];

	const [product, setProduct] = useState({
		title: editProduct?.title || "",
		brand: editProduct?.brand || "",
		img1: editProduct?.img1 || "",
		img2: editProduct?.img2 || "",
		img3: editProduct?.img3 || "",
		img4: editProduct?.img4 || "",
		price: editProduct?.price || "",
		actualPrice: editProduct?.actualPrice || "",
		rating: editProduct?.rating || "",
		ratingCount: editProduct?.ratingCount || "",
		description: editProduct?.description || "",
		category: editProduct?.category || "",
		subCategory: editProduct?.subCategory || "",
		keywords: editProduct?.keywords || "",
		date: new Date().toLocaleString("en-US", {
			month: "short",
			day: "2-digit",
			year: "numeric",
		}),
	});

	// ------------------------------------------------------
	useEffect(() => {
		scrollToTop();
	}, []);

	// ADD PRODUCT FUNCTION
	const updateProduct = async (e) => {
		e.preventDefault();

		if (
			!product.title ||
			!product.brand ||
			!product.img1 ||
			!product.img2 ||
			!product.img3 ||
			!product.img4 ||
			!product.price ||
			!product.actualPrice ||
			!product.rating ||
			!product.ratingCount ||
			!product.description ||
			!product.category ||
			!product.keywords ||
			!product.subCategory
		) {
			setErrorMsg("Please fill all fields");
			return;
		}
		try {
			await updateDoc(doc(fireDB, "allProducts", productId), product);
			console.log("Product updated");
			toastProductUpdated();
		} catch (e) {
			console.error("Error adding document: ", e);
		} finally {
			handleReset();
			fetchProducts();
		}
	};

	// HANDLE ADD-PRODUCT FORM RESET
	const handleReset = () => {
		setProduct({
			title: "",
			brand: "",
			img1: "",
			img2: "",
			img3: "",
			img4: "",
			price: "",
			actualPrice: "",
			rating: "",
			ratingCount: "",
			description: "",
			category: "",
			subCategory: "",
			keywords: "",
		});

		setErrorMsg("");
	};

	const categoryOptions = [
		{ value: "electronics_and_devices", label: "Electronics & Devices" },
		{ value: "mens_fashion", label: "Men's Fashion" },
		{ value: "womens_fashion", label: "Women's Fashion" },
		{ value: "kids_fashion", label: "Kid's Fashion" },
		{ value: "jewellery", label: "Jewellery" },
		{ value: "books", label: "Books" },
	];

	const subCategoryOptions = {
		electronics_and_devices: [
			{ value: "laptops", label: "Laptops" },
			{ value: "mobiles", label: "Mobiles" },
			{ value: "tablets", label: "Tablets" },
			{ value: "smart_watches", label: "Smart Watches" },
		],
		mens_fashion: [
			{ value: "mens_shirts", label: "Shirts & T-Shirts" },
			{ value: "mens_footwear", label: "Shoes & Sneakers" },
			{ value: "mens_jackets", label: "Jackets" },
		],
		womens_fashion: [
			{ value: "womens_dresses", label: "Dresses" },
			{ value: "womens_tops", label: "Top Western" },
			{ value: "womens_footwear", label: "Footwear" },
		],
		kids_fashion: [
			{ value: "kids_cloth", label: "Kids Cloth" },
			{ value: "kids_footwear", label: "Kids Footwear" },
		],
		jewellery: [
			{ value: "jewellery_gold", label: "Gold" },
			{ value: "jewellery_silver", label: "Silver" },
			{ value: "jewellery_platinum", label: "Platinum" },
		],
		books: [
			{ value: "books_comics", label: "Comics" },
			{ value: "books_devotional", label: "Devotional" },
			{ value: "books_programming", label: "Programming" },
		],
	};

	const handleCategoryChange = (event) => {
		const selectedCategory = event.target.value;
		setProduct((prev) => ({
			...prev,
			category: selectedCategory,
			subCategory: "",
		}));
	};

	const handleSubCategoryChange = (event) => {
		const selectedSubCategory = event.target.value;
		setProduct((prev) => ({
			...prev,
			subCategory: selectedSubCategory,
		}));
	};
	// ------------------------------------------------------
	return (
		<>
			<NavbarForAdmin />
			<div className="flex flex-col items-center ">
				<form className="flex flex-col md:border px-4 pb-7 md:pt-3 md:px-7  md:mt-8 rounded-lg md:shadow-2xl gap-2 lg:w-[80%]">
					<h1 className="font-semibold text-2xl my-4 text-gray-600">
						Update Product
					</h1>
					{/*CONTAINER*/}
					<div className="container">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
							{/*---------------------------------------------------------*/}

							{/*PRODUCT DETAIL*/}
							<div>
								<h2 className="font-semibold text-gray-600">
									Product Detail
								</h2>
								<div className="flex flex-col">
									<input
										type="text"
										placeholder="Title"
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
										value={product.title}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												title: event.target.value,
											}))
										}
									/>
									<input
										type="text"
										placeholder="Brand name"
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
										value={product.brand}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												brand: event.target.value,
											}))
										}
									/>

									<input
										type="text"
										placeholder="Description"
										className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300"
										value={product.description}
										onChange={(event) =>
											setProduct((prev) => ({
												...prev,
												description: event.target.value,
											}))
										}
									/>
								</div>
								<div className="mt-5">
									<h2 className="font-semibold text-gray-600">
										Product Images (Links)
									</h2>
									<div className="flex gap-5">
										<div>
											<input
												type="text"
												placeholder="Image 1"
												className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
												value={product.img1}
												onChange={(event) =>
													setProduct((prev) => ({
														...prev,
														img1: event.target
															.value,
													}))
												}
											/>
											<input
												type="text"
												placeholder="Image 2"
												className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
												value={product.img2}
												onChange={(event) =>
													setProduct((prev) => ({
														...prev,
														img2: event.target
															.value,
													}))
												}
											/>
										</div>
										<div>
											<input
												type="text"
												placeholder="Image 3"
												className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
												value={product.img3}
												onChange={(event) =>
													setProduct((prev) => ({
														...prev,
														img3: event.target
															.value,
													}))
												}
											/>
											<input
												type="text"
												placeholder="Image 4"
												className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
												value={product.img4}
												onChange={(event) =>
													setProduct((prev) => ({
														...prev,
														img4: event.target
															.value,
													}))
												}
											/>
										</div>
									</div>
								</div>
							</div>

							{/*-------------------------------------------------------------------*/}

							{/*PRODUCT CATEGORY*/}
							<div className="flex flex-col">
								<h2 className="font-semibold text-gray-600">
									Product Category
								</h2>
								<div className="flex flex-col">
									<select
										className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 "
										value={product.category}
										onChange={handleCategoryChange}
									>
										<option value="" defaultValue disabled>
											Category
										</option>
										{categoryOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>

									<select
										className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 "
										value={product.subCategory}
										onChange={handleSubCategoryChange}
										disabled={!product.category} // Disable if no category selected
									>
										<option value="" defaultValue disabled>
											Sub Category
										</option>
										{subCategoryOptions[product.category] &&
											subCategoryOptions[
												product.category
											].map((option) => (
												<option
													key={option.value}
													value={option.value}
												>
													{option.label}
												</option>
											))}
									</select>
								</div>
								<div className="mt-6">
									<h2 className="font-semibold text-gray-600">
										Product Rating | Price | Keywords
									</h2>
									<div className="flex gap-5">
										<select
											className="border py-2 px-3 mt-3 rounded-lg outline-blue-300 w-[100%] "
											value={product.rating}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													rating: event.target.value,
												}))
											}
										>
											<option
												value=""
												defaultValue
												disabled
											>
												Select Rating
											</option>
											<option value="1">1 Star</option>
											<option value="2">2 Stars</option>
											<option value="3">3 Stars</option>
											<option value="4">4 Stars</option>
											<option value="5">5 Stars</option>
										</select>

										<input
											type="number"
											placeholder="Rating count"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%] "
											value={product.ratingCount}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													ratingCount:
														event.target.value,
												}))
											}
										/>
									</div>
								</div>

								{/*----------------------------------------------------------------*/}

								<div className="mt-0">
									<div className="flex gap-5">
										<input
											type="number"
											placeholder="Price"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
											value={product.price}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													price: event.target.value,
												}))
											}
										/>
										<input
											type="number"
											placeholder="Actual price"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
											value={product.actualPrice}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													actualPrice:
														event.target.value,
												}))
											}
										/>
									</div>
									<div className="flex gap-5">
										<input
											type="text"
											placeholder="Keywords"
											className="border py-2 px-3 mt-3 rounded-lg  outline-blue-300 w-[100%]"
											value={product.keywords}
											onChange={(event) =>
												setProduct((prev) => ({
													...prev,
													keywords:
														event.target.value,
												}))
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex  gap-5 mt-8 flex-col md:flex-row ">
						<button
							className="bg-yellow-400 p-2 rounded-lg outline-blue-300 hover:bg-yellow-500 active:bg-yellow-400 px-6  "
							onClick={updateProduct}
						>
							Update Product
						</button>
						<button
							type="button"
							className="bg-gray-300 p-2  rounded-lg outline-blue-300 hover:bg-gray-400 active:bg-gray-300 px-10 "
							onClick={handleReset}
						>
							Reset
						</button>
						{/* Error Message */}
						<span
							className={`text-red-500 font-semibold mt-2 flex items-center gap-2 md:ml-10 ${
								errorMsg.length !== 0 ? "block" : "hidden"
							}`}
						>
							{errorMsg.length > 0 && (
								<IoMdSad className="text-2xl animate-bounce" />
							)}
							{errorMsg}
						</span>
					</div>
				</form>
			</div>
		</>
	);
}

export default UpdateProduct;
