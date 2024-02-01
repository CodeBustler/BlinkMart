import { useContext, useEffect, useState } from "react";
import ContainerForCard from "../ProductCard/ContainerForCard";
import ProductCard from "../ProductCard/ProductCard";
import { MyContext } from "../../App";
// ICON
import { MdStar, MdStarBorder } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { RiMotorbikeFill } from "react-icons/ri";
import { AiOutlineTrophy } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import {
	calculateDiscountPercentage,
	toastAddedToCart,
	numberWithCommas,
} from "../Utilities/RequiredFunctions";
import noImage from "../../assets/no_image.png";
// ROUTER
import { useNavigate, useParams } from "react-router-dom";
import tickIcon from "../../assets/tick_icon.png";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig/firebase";
import { scrollToTop } from "../utilities/RequiredFunctions";

// ---------------------------------------------------------

function ProductDetail() {
	const [displayProduct, setDisplayProduct] = useState([]);
	const [mainImage, setMainImage] = useState("");
	const [itemInCart, setLocalItemInCart] = useState("Add To Cart");
	const { productId } = useParams(); //EXTRACT PRODUCT ID TO DISPLAY
	const [isAddingToCart, setIsAddingToCart] = useState(false);
	const navigateTo = useNavigate();

	// CONTEXT
	const {
		allProducts,
		setItemInCart,
		handleCartAnimate,
		userCartDetails,
		userUID,
		fetchUserCart,
	} = useContext(MyContext);

	// --------------------------------------------------------
	// ****************** FILTERING PRODUCT ******************
	// --------------------------------------------------------
	// FILTER SINGLE PRODUCT
	useEffect(() => {
		const filterProduct = allProducts.filter(
			(item) => item.id === productId,
		);

		console.log(filterProduct.length);
		if (filterProduct.length > 0) {
			setDisplayProduct(filterProduct[0]);
			setMainImage(filterProduct[0].img1);
		} else {
			console.log("Fail");
			navigateTo("/");
		}
	}, [productId, displayProduct.id]);

	// FILTER RELATED PRODUCTS
	const filterSubCategory = allProducts.filter(
		(item) => item.subCategory === displayProduct.subCategory,
	);

	// DISCOUNT PERCENTAGE
	const discountPercentage = calculateDiscountPercentage(displayProduct);

	// --------------------------------------------------------
	// **************** CARD BTN TEXT UPDATE  *****************
	// --------------------------------------------------------
	useEffect(() => {
		// CHECKS ITEM IS ALREADY IN CART
		const isItemInCart = userCartDetails.some(
			(cItem) => cItem.id === displayProduct.id,
		);

		// UPDATE CARD BUTTON TEXT BASED ON "isItemInCart"
		setLocalItemInCart(isItemInCart ? "In Basket" : "Add To Cart");
	}, [userCartDetails, displayProduct.id]);

	// ------------------------------------------------------
	// ******************** ADD TO CART *********************
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
					(cItem) => cItem.id === displayProduct.id,
				);

				if (isItemInCart) {
					setItemInCart("In Basket");
				} else {
					const docRef = await addDoc(
						collection(fireDB, userUID),
						displayProduct,
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
			e.target.disabled = false;
		}
	};

	useEffect(() => {
		scrollToTop();
	}, []);

	// ---------------------------------------------------------
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-start  gap-10 md:gap-0 p-4">
				{/*LEFT CONTAINER*/}
				<div className="flex flex-col-reverse md:flex-row items-center md:items-start  justify-center lg:justify-end gap-2 md:w-[90%] w-full ">
					{/*IMG THUMNAILS*/}
					<div className=" mt-7 md:mt-0 flex md:flex-col gap-4 md:gap-5 flex-wrap justify-center  ">
						<div className="w-[70px] md:w-[80px] border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img1}
								alt=""
								className="w-[100%]"
								onMouseEnter={() =>
									setMainImage(displayProduct.img1)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px]  border border-2  overflow-hidden rounded-xl cursor-pointer  ">
							<img
								src={displayProduct.img2}
								alt=""
								className="w-[100%]"
								onMouseEnter={() =>
									setMainImage(displayProduct.img2)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px]  border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img3}
								alt=""
								className="w-[100%]"
								onMouseEnter={() =>
									setMainImage(displayProduct.img3)
								}
							/>
						</div>
						<div className="w-[70px] md:w-[80px] border border-2  overflow-hidden rounded-xl cursor-pointer ">
							<img
								src={displayProduct.img4}
								alt=""
								className="w-[100%]"
								onMouseEnter={() =>
									setMainImage(displayProduct.img4)
								}
							/>
						</div>
					</div>
					{/*MAIN IMG*/}
					<div className="w-[90%] md:w-[70%] object-center object-cover  m-2 rounded-md overflow-hidden bg-white flex flex-row-reverse items-center justify-center">
						<img
							src={mainImage}
							alt="product-image"
							className="object-contain w-full h-[280px] md:h-[300px] lg:h-[500px] hover:scale-125 transition "
						/>
					</div>
				</div>

				{/*RIGHT CONTAINER*/}
				<div className=" max-w-[600px] ">
					<p className="text-md pt-3 text-gray-400 capitalize">
						{displayProduct?.category?.replace(/_/g, " ") || ""} /
						&nbsp;
						{displayProduct?.subCategory?.replace(/_/g, " ") || ""}
					</p>
					<h2 className="font-bold text-2xl pt-2 capitalize">
						{displayProduct.title}
					</h2>
					<div className="flex items-center gap-3">
						<div className="flex my-4">
							{Array.from({ length: 5 }).map((_, index) =>
								index < displayProduct.rating ? (
									<MdStar
										key={index}
										className="text-yellow-500"
									/>
								) : (
									<MdStarBorder
										key={index}
										className="text-gray-300"
									/>
								),
							)}
						</div>
						<div className="text-gray-500">
							<span>
								{displayProduct.ratingCount
									? numberWithCommas(
											displayProduct.ratingCount,
									  )
									: ""}
							</span>
							&nbsp; Ratings
						</div>
					</div>
					<p
						className="text-gray-500 first-letter:capitalize"
						title={displayProduct.description}
					>
						{displayProduct?.description?.slice(0, 400)}....
					</p>
					<div className="md:flex flex-col md:flex-row items-center justify-between gap-5 my-3 mt-4">
						<div className="flex flex-wrap items-center  gap-5 md:gap-2 lg:gap-5">
							<div className="font-bold py-3 text-3xl">
								₹
								{displayProduct.price
									? numberWithCommas(displayProduct.price)
									: ""}
							</div>
							<div className="line-through mt-2 text-gray-500">
								₹{" "}
								{displayProduct.actualPrice
									? numberWithCommas(
											displayProduct.actualPrice,
									  )
									: ""}
							</div>
							<div className="text-md text-red-500 text-xl font-semibold mt-2">
								{discountPercentage}% Off
							</div>
						</div>

						<button
							className={`bg-orange-400 border  border-2  min-w-[200px] w-[100%] md:w-[40%] rounded-md py-2 mt-1 font-semibold cursor-pointer  ${
								itemInCart === "In Basket"
									? "bg-white  border-gray-400 "
									: "bg-orange-400 active:bg-orange-300 border-transparent"
							} `}
							onClick={addCart}
						>
							{itemInCart === "In Basket" ? (
								<div className="flex items-center justify-center gap-3">
									<img
										src={tickIcon}
										alt=""
										className="w-[20px] md:w-[9%] scale-125"
									/>
									{itemInCart}
								</div>
							) : (
								itemInCart
							)}
						</button>
					</div>
					<div className=" text-gray-500 mt-8 md:mt-0">
						{displayProduct.price > 500
							? "FREE Delivery By BlinkMart"
							: "+ ₹20 Delivery Charges"}
					</div>
					{/*BENEFITS*/}
					<div className="flex flex-wrap justify-around md:justify-between gap-4 mt-3 border-t border-gray-800 pt-7 ">
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<FaArrowRotateLeft className="text-xl text-red-500" />
							<p className="text-center text-sm text-gray-500">
								10 days Returnable
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<RiMotorbikeFill className="text-xl text-purple-500" />
							<p className="text-center text-sm text-gray-500">
								Fast Delivery
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<AiOutlineTrophy className="text-xl text-orange-500" />

							<p className="text-center text-sm text-gray-500">
								Top Brand
							</p>
						</div>
						<div className="flex flex-col items-center gap-2  max-w-[100px] shadow-lg p-5 rounded-lg border cursor-pointer">
							<GrSecure className="text-xl text-green-500" />
							<p className="text-center text-sm text-gray-500">
								Secure Transaction
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-10 p-4">
				<ContainerForCard
					containerTitle={"Related Products"}
					filterProducts={filterSubCategory[0]?.subCategory}
				>
					{filterSubCategory.map((category, categoryIndex) => {
						return (
							<ProductCard key={categoryIndex} item={category} />
						);
					})}
				</ContainerForCard>
			</div>
		</>
	);
}

export default ProductDetail;
