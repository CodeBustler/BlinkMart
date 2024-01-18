import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { useParams } from "react-router-dom";
import ContainerForCard from "../ProductCard/ContainerForCard";
import ProductCard from "../ProductCard/ProductCard";

function ProductsCategory() {
	const { categoryName } = useParams();
	const { allProducts } = useContext(MyContext);

	const filterProducts = allProducts.filter(
		(item) => item.category === categoryName,
	);

	// SUB_CATEGORY
	const subCategoryArrays = {};

	filterProducts.forEach((product) => {
		const { subCategory, ...rest } = product;

		if (!subCategoryArrays[subCategory]) {
			subCategoryArrays[subCategory] = [];
		}

		subCategoryArrays[subCategory].push(rest);
	});

	console.log(subCategoryArrays);

	console.log(filterProducts);
	return (
		<div>
			<h1 className="text-2xl font-bold my-3 text-center md:text-left capitalize">
				{categoryName.replace(/_/g, " ")}
			</h1>

			<ContainerForCard
				containerTitle={"E"}
				filterProducts={filterProducts}
			>
				{filterProducts.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</ContainerForCard>
		</div>
	);
}

export default ProductsCategory;
