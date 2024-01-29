import React from "react";
import { Link } from "react-router-dom";

function CategoryContainer({ title, category }) {
	return (
		<div className="min-w-[380px] bg-gray-200 rounded shadow p-5">
			<h2 className="font-semibold text-xl">{title}</h2>
			<div className="grid grid-cols-2 gap-3 my-5">
				<div className="bg-red-100">
					<img src="" alt="" className="w-[150px]" />
					<p>Image</p>
				</div>
				<div className="bg-red-100">
					<img src="" alt="" className="w-[150px]" />
					<p>Image</p>
				</div>
				<div className="bg-red-100">
					<img src="" alt="" className="w-[150px]" />
					<p>Image</p>
				</div>
				<div className="bg-red-100">
					<img src="" alt="" className="w-[150px]" />
					<p>Image</p>
				</div>
			</div>
			<Link to="/ProductsSubCategory/hh">See more...</Link>
		</div>
	);
}

export default CategoryContainer;
