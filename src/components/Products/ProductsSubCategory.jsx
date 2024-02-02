import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import ProductCard from "../ProductCard/ProductCard";
import { scrollToTop } from "../utilities/RequiredFunctions";
import Loader from "../Utilities/Loader";
// ROUTER
import { useParams } from "react-router-dom";
// ------------------------------------------------------

function ProductsSubCategory() {
	const { subCategoryName } = useParams();
	const { allProducts, loading } = useContext(MyContext);
	const [subCategoryItems, setSubCategoryItems] = useState([]);
	// ------------------------------------------------------

	// ------------------------------------------------------
	//  ************ FILTER SUB-CATEGORY ITEMS *************
	// ------------------------------------------------------
	useEffect(() => {
		const filterSubCategoryItems = allProducts.filter(
			(item) => item.subCategory === subCategoryName,
		);
		filterSubCategoryItems.reverse();
		setSubCategoryItems(filterSubCategoryItems);
		scrollToTop();
	}, [allProducts, subCategoryName]);

	// ------------------------------------------------------
	return (
		<>
			<div className="container mx-auto mt-6 p-3 md:p-0">
				<h1 className="underline underline-offset-8 underline-heading text-2xl font-bold my-3 text-center md:text-left capitalize">
					{subCategoryName.replace(/_/g, " ")}
				</h1>
				{loading ? (
					<Loader />
				) : (
					<div className="container mx-auto ">
						<div
							className={`flex flex-wrap mt-10 gap-5 ${
								subCategoryItems.length < 4
									? "justify-center md:justify-start"
									: "justify-center md:justify-start"
							} `}
						>
							{subCategoryItems.map((item, index) => (
								<ProductCard key={index} item={item} />
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ProductsSubCategory;
