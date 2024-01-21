// ROUTER
import { Link, NavLink } from "react-router-dom";
// ICONS
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAdminFill, RiShoppingCartFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import flag_icon from "../../../assets/flag_icon.png";
import { useState } from "react";
import { scrollToTop } from "../../Utilities/RequiredFunctions";
import ReactLoading from "react-loading";

// ---------------------------------------------------------------

function NavbarFirstRow({
	handleSideBar,
	admin,
	cartAnimate,
	handleCartIcon,
	currentUser,
	userName,
	cartItemsRX,
}) {
	const [searchBarFocus, setSearchFocus] = useState(false);
	const handleSideBarOnFocus = () => {
		setSearchFocus(!searchBarFocus);
	};

	const handleSideBarOnBlur = () => {
		setSearchFocus(!searchBarFocus);
	};
	// ----------------------------------------------
	return (
		<nav className="bg-[#131921] flex items-center justify-between px-4 py-3 gap-3 text-white  ">
			<div
				className="font-semibold text-sm flex gap-2 md:hidden"
				onClick={() => {
					handleSideBar();
				}}
			>
				<RxHamburgerMenu className="text-2xl cursor-pointer" />
			</div>
			{/* LOGO */}
			<Link
				to="/"
				className="font-bold text-2xl flex items-center gap-1 "
				onClick={scrollToTop}
			>
				<RiShoppingCartFill className="text-3xl text-orange-400" />
				<span className="hidden md:flex">BlinkMart</span>
			</Link>

			{/* SEARCH BAR */}
			<div className="flex items-stretch justify-between bg-white rounded w-[75%] md:w-[55%]  ">
				<input
					type="text"
					placeholder="Search BlinkMart.in "
					className="bg-transparent outline-none px-4 py-2 text-black text-md w-[100%] "
					onFocus={handleSideBarOnFocus}
					onBlur={handleSideBarOnBlur}
				/>
				<div className="bg-orange-400 flex items-center rounded-br rounded-tr cursor-pointer">
					<BsSearch className="text-black text-xl mx-3" />
				</div>
			</div>
			{/* NAV-LINKs */}
			<ul
				className={`flex items-center gap-2 flex-row-reverse md:flex-row md:gap-5 transition ${
					searchBarFocus ? "hidden md:flex" : "block "
				} `}
			>
				<li className="hidden lg:flex items-center gap-1  ">
					<img
						src={flag_icon}
						alt="indian-flag"
						className="w-[27px] "
					/>
					<span className="font-semibold ">EN</span>
				</li>

				{/*DISPLAY USERNAME */}
				{userName ? (
					<div className="hidden lg:flex items-start flex-col font-bold leading-none">
						<small className="text-gray-300 font-semibold">
							Hello,{" "}
						</small>
						<div className="uppercase pt-[2px]">{userName}</div>
					</div>
				) : (
					""
				)}

				{/* Cart Icon */}
				<NavLink
					className="flex items-center gap-1"
					to="/cart"
					onClick={handleCartIcon}
				>
					<LuShoppingCart
						className={`text-3xl cursor-pointer  ${
							cartAnimate ? "animate-bounce" : ""
						}  `}
					/>
					<span className="text-md md:text-lg font-bold text-orange-400">
						{currentUser && cartItemsRX.length > 0
							? cartItemsRX.length
							: 0}
					</span>
				</NavLink>
				{admin && (
					<NavLink
						to="/dashboard"
						className={`font-semibold cursor-pointer md:border md:p-2  rounded-md hover:border-orange-400 transition   ${
							admin ? "block" : "hidden"
						}`}
					>
						<span className="flex gap-2">
							<RiAdminFill className="text-2xl text-orange-400" />
							<span className="hidden md:inline">Dashboard</span>
						</span>
					</NavLink>
				)}
			</ul>
		</nav>
	);
}

export default NavbarFirstRow;
