import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
// ICONS
import { BsFillBoxSeamFill } from "react-icons/bs";
import { RiEBike2Fill, RiShoppingCartFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { PiKeyReturnFill } from "react-icons/pi";
import { FaListUl } from "react-icons/fa";
// COMPONENTS
import AnimatedNumber from "../../components/Utilities/AnimateText";
import NavbarForAdmin from "../../components/Navbar/NavbarForAdmin";
import ProductsTable from "./tableData/ProductsTable";
import UsersTable from "./tableData/UsersTable";
// ROUTER
import { Link, useNavigate } from "react-router-dom";

// ---------------------------------------------------------------

function Dashboard() {
	const [selectedButton, setSelectedButton] = useState("products");
	const { admin, allProducts } = useContext(MyContext);
	const navigate = useNavigate();

	useEffect(() => {
		!admin && navigate("/login");
	});

	const renderComponents = () => {
		switch (selectedButton) {
			case "products":
				return <ProductsTable />;
			case "users":
				return <UsersTable />;
			default:
				return null;
		}
	};

	return (
		<>
			<NavbarForAdmin />
			{admin ? (
				<div className="m-5">
					<h1 className="text-2xl font-bold my-3 text-center md:text-left">
						Dashboard
					</h1>
					<div className="container mx-auto mt-7 ">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-20 text-gray-800">
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col cursor-pointer transition md:hover:-translate-y-2 ">
								<BsFillBoxSeamFill className="text-5xl text-purple-400" />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={allProducts.length}
										duration={2000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Total Products
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col cursor-pointer transition md:hover:-translate-y-2  ">
								<RiEBike2Fill className="text-5xl text-blue-400 " />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Total Orders
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2  ">
								<PiUsersThreeFill className="text-5xl text-green-400 " />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg text-gray-500">
									Total Users
								</div>
							</div>
							<div className="border rounded-2xl shadow-lg hover:shadow-2xl p-5 text-center flex items-center gap-4 flex-col  cursor-pointer transition md:hover:-translate-y-2 ">
								<PiKeyReturnFill className="text-5xl text-red-400" />
								<div className="font-bold text-2xl text-gray-600">
									<AnimatedNumber
										target={851}
										duration={3000}
									/>
								</div>
								<div className="font-semibold text-lg  text-gray-500">
									Return Products
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center flex-wrap gap-10 mt-16 ">
						<Link
							className="text-lg font-semibold border px-10 py-1 rounded text-purple-500 border-purple-500 flex items-center gap-3 active:bg-purple-500 active:text-white transition   "
							onClick={() => setSelectedButton("products")}
						>
							<FaListUl /> Products
						</Link>

						<Link
							className="text-lg font-semibold border px-10 py-1 rounded text-green-500 border-green-500 flex items-center gap-3 active:bg-green-500 active:text-white transition   "
							onClick={() => setSelectedButton("users")}
						>
							<FaListUl /> Users
						</Link>
					</div>

					{renderComponents()}
				</div>
			) : (
				navigate("/login")
			)}
		</>
	);
}

export default Dashboard;
