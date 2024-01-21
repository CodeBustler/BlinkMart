// ROUTER
import { NavLink } from "react-router-dom";
// ICONS
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPhoneAlt } from "react-icons/fa";
// ---------------------------------------------------------------

function NavbarSecondRow({ handleSideBar }) {
	return (
		<ul className="bg-[#232F3E] px-5 py-2 flex items-center gap-x-8 gap-y-4 hidden md:flex flex-wrap text-white">
			{/* ALL PRODUCTS */}
			<div
				className="font-semibold text-sm flex gap-2 cursor-pointer"
				onClick={handleSideBar}
			>
				<RxHamburgerMenu className="text-xl cursor-pointer" />
				All
			</div>
			<NavLink
				to="/ProductsCategory/electronics_and_devices"
				className="font-semibold text-sm"
			>
				Electronics & Devices
			</NavLink>
			<NavLink
				to="/ProductsCategory/mens_fashion"
				className="font-semibold text-sm"
			>
				Men's Fashion
			</NavLink>
			<NavLink
				to="/ProductsCategory/womens_fashion"
				className="font-semibold text-sm"
			>
				Women's Fashion
			</NavLink>
			<NavLink
				to="/ProductsCategory/kids_fashion"
				className="font-semibold text-sm"
			>
				Kid's Fashion
			</NavLink>
			<NavLink
				to="/ProductsCategory/jewellery"
				className="font-semibold text-sm"
			>
				Jewellery
			</NavLink>
			<NavLink
				to="/ProductsCategory/books"
				className="font-semibold text-sm"
			>
				Books
			</NavLink>
			<NavLink
				to="/customer_service"
				className="font-semibold text-sm flex items-center gap-2"
			>
				<FaPhoneAlt />
				Customer Service
			</NavLink>
		</ul>
	);
}

export default NavbarSecondRow;
