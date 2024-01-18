import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import ProductCard from "../ProductCard/ProductCard";
import { scrollToTop } from "../utilities/RequiredFunctions";
import { useParams } from "react-router-dom";

function ProductsSubCategory() {
	const { subCategoryName } = useParams();
	const { allProducts, loading } = useContext(MyContext);
	const [subCategoryItems, setSubCategoryItems] = useState([]);
	// ------------------------------------------------------

	useEffect(() => {
		const filterSubCategoryItems = allProducts.filter(
			(item) => item.subCategory === subCategoryName,
		);
		setSubCategoryItems(filterSubCategoryItems);
		scrollToTop();
	}, []);

	// ------------------------------------------------------

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="container mx-auto ">
					<h1 className=" underline underline-offset-8 underline-heading text-2xl font-bold my-3 text-center md:text-left capitalize">
						{subCategoryName.replace(/_/g, " ")}
					</h1>
					<div className="flex flex-wrap justify-start gap-5 mt-8">
						{/*MAPPING PRODUCTS*/}
						{subCategoryItems.map((item, index) => (
							<ProductCard key={index} item={item} />
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default ProductsSubCategory;
