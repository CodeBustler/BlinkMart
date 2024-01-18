import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { useParams } from "react-router-dom";
import ContainerForCard from "../ProductCard/ContainerForCard";
import ProductCard from "../ProductCard/ProductCard";
import { scrollToTop } from "../utilities/RequiredFunctions";

function ProductsCategory() {
	const { categoryName } = useParams();
	const [subCategoryTitles, setSubCategoryTitles] = useState([]);
	const { allProducts } = useContext(MyContext);

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

	console.log(subCategoryTitles);
	return (
		<div>
			<h1 className="underline underline-offset-8 underline-heading text-2xl font-bold my-3 text-center md:text-left capitalize">
				{categoryName.replace(/_/g, " ")}
			</h1>

			{subCategoryTitles.map((item_subCategory) => (
				<ContainerForCard
					containerTitle={item_subCategory}
					filterProducts={item_subCategory}
				>
					{allProducts.map((item) => {
						if (item.subCategory === item_subCategory) {
							return <ProductCard item={item} />;
						}
					})}
				</ContainerForCard>
			))}
		</div>
	);
}

export default ProductsCategory;
