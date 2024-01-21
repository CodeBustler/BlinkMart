import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { scrollToTop } from "../utilities/RequiredFunctions";
// COMPONENTS
import ContainerForCard from "../ProductCard/ContainerForCard";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Utilities/Loader";
// ROUTER
import { useParams } from "react-router-dom";
// ----------------------------------------------------------

function ProductsCategory() {
	const [subCategoryTitles, setSubCategoryTitles] = useState([]);
	const { allProducts, loading } = useContext(MyContext);
	const { categoryName } = useParams();

	// FILTERING SUB_CATEGORY
	const subCategoryArrays = {};

	// FILTERING MAIN_CATEGORY
	const filterProducts = allProducts.filter(
		(item) => item.category === categoryName,
	);

	useEffect(() => {
		filterProducts.forEach((product) => {
			const { subCategory, ...rest } = product;

			if (!subCategoryArrays[subCategory]) {
				subCategoryArrays[subCategory] = [];
			}

			subCategoryArrays[subCategory].push(rest);
		});

		// MAKING ARRAY OF SUBTITLES FOR FILTER & MAP WITH ALL PRODUCTS
		const newSubCategoryTitles = Object.keys(subCategoryArrays);
		setSubCategoryTitles(newSubCategoryTitles);
		scrollToTop();
	}, [allProducts, categoryName]);

	// ----------------------------------------------------------
	return (
		<div>
			<h1 className="underline underline-offset-8 underline-heading text-2xl font-bold my-3 text-center md:text-left capitalize">
				{categoryName.replace(/_/g, " ")}
			</h1>
			{loading ? (
				<Loader />
			) : (
				subCategoryTitles.map((item_subCategory, index) => (
					<ContainerForCard
						key={index}
						containerTitle={item_subCategory}
						filterProducts={item_subCategory}
					>
						{allProducts.map((item, index) => {
							if (item.subCategory === item_subCategory) {
								return <ProductCard item={item} key={index} />;
							}
						})}
					</ContainerForCard>
				))
			)}
		</div>
	);
}

export default ProductsCategory;
