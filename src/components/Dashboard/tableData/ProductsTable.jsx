import React from "react";
import AddProduct from "../AddProduct";
import { Link } from "react-router-dom";

function ProductsTable() {
	return (
		<div>
			<Link to="/addProduct">Add New Product</Link>
		</div>
	);
}

export default ProductsTable;
