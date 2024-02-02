import React from "react";
import { Link, useNavigate } from "react-router-dom";

// ----------------------------------------------------------------
function CategoryContainer({ title, category }) {
	const navigateTo = useNavigate();

	// NAVIGATE
	const handleNavigate = (productId) => {
		navigateTo(`/ProductDetail/${productId}`);
	};

	// ----------------------------------------------------------------
	if (!category || category.length === 0) {
		return (
			<div className="bg-white rounded shadow p-5">
				<h2 className="font-semibold text-xl">Loading...</h2>
				<div className="flex justify-center items-center my-5">
					<div className="w-full">
						<div className="w-[90%] h-[150px] m-2 bg-gray-400 p-5 rounded animate-pulse"></div>
						<div className="w-[90%] h-[150px] m-2 bg-gray-400 p-5 rounded animate-pulse mt-4"></div>
					</div>
					<div className="w-full">
						<div className="w-[90%] h-[150px] m-2 bg-gray-400 p-5 rounded animate-pulse"></div>
						<div className="w-[90%] h-[150px] m-2 bg-gray-400 p-5 rounded animate-pulse mt-4"></div>
					</div>
				</div>
				<div className="text-blue-400 font-semibold">Loading...</div>
			</div>
		);
	}

	// ----------------------------------------------------------------
	return (
		<div className="bg-white rounded shadow p-5">
			<h2 className="font-semibold text-xl">{title}</h2>
			<div className="flex justify-center my-5">
				<div>
					{category[4] && (
						<img
							src={category[4].img1}
							alt=""
							className="w-[170px] h-[170px] object-contain border p-5 cursor-pointer"
							onClick={() => handleNavigate(category[4].id)}
							title={category[4].title}
						/>
					)}
					{category[1] && (
						<img
							src={category[1].img1}
							alt=""
							className="w-[170px] h-[170px] object-contain border p-5 cursor-pointer"
							onClick={() => handleNavigate(category[1].id)}
							title={category[1].title}
						/>
					)}
				</div>
				<div>
					{category[2] && (
						<img
							src={category[2].img1}
							alt=""
							className="w-[170px] h-[170px]  object-contain border p-5 cursor-pointer"
							onClick={() => handleNavigate(category[2].id)}
							title={category[2].title}
						/>
					)}
					{category[3] && (
						<img
							src={category[3].img1}
							alt=""
							className="w-[170px] h-[170px] object-contain border p-5 cursor-pointer"
							onClick={() => handleNavigate(category[3].id)}
							title={category[3].title}
						/>
					)}
				</div>
			</div>
			<Link
				to={`/ProductsSubCategory/${category[0].subCategory}`}
				className="text-blue-400 font-semibold"
			>
				See more...
			</Link>
		</div>
	);
}

export default CategoryContainer;
