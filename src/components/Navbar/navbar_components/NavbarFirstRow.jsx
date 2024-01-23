import { useState } from "react";
// ROUTER
import { Link, NavLink } from "react-router-dom";
// ICONS
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAdminFill, RiShoppingCartFill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { scrollToTop } from "../../Utilities/RequiredFunctions";
import flag_icon from "../../../assets/flag_icon.png";
import { VscAccount } from "react-icons/vsc";
import { FiBox } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
// ---------------------------------------------------------------

function NavbarFirstRow({
	// PROPS
	handleSideBar,
	admin,
	userName,
	cartAnimate,
	handleCartIcon,
	currentUser,
	handleLogout,
	userCartDetails,
}) {
	const [searchBarFocus, setSearchFocus] = useState(false);
	const [logoutBTN, setLogoutBTN] = useState();
	const [isHovered, setIsHovered] = useState(false);

	// -------------------------------------------------------
	// ************** HANDLING SEARCHBAR WIDTH ***************
	// -------------------------------------------------------
	// ON FOCUS
	const handleSideBarOnFocus = () => {
		setSearchFocus(!searchBarFocus);
	};
	// ON BLUR
	const handleSideBarOnBlur = () => {
		setSearchFocus(!searchBarFocus);
	};

	// -------------------------------------------------------
	return (
		<nav className="bg-[#131921] flex items-center justify-between px-4 py-3 gap-3 md:gap-10 text-white  ">
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

			{/* LOCATION */}
			{admin ? (
				""
			) : (
				<div className="group hidden lg:flex items-start flex-col font-bold leading-none whitespace-nowrap">
					<small className="text-gray-300 font-semibold">
						Deliver to {userName}
					</small>
					<div className="capitalize pt-[4px] flex gap-1 text-[15px]">
						<LuMapPin />
						{currentUser && currentUser.length > 0
							? `${currentUser[0]?.city || ""} ${
									currentUser[0]?.areaPinCode || ""
							  }`
							: "Loading..."}
					</div>
				</div>
			)}

			{/* SEARCH BAR */}
			<div className="flex items-stretch justify-between bg-white rounded w-[80%] md:w-full ">
				<input
					type="text"
					placeholder="Search BlinkMart.in"
					className="flex-grow bg-transparent outline-none px-4 py-2 text-black text-md w-[100%]"
					onFocus={handleSideBarOnFocus}
					onBlur={handleSideBarOnBlur}
				/>
				<div className="bg-orange-400 flex items-center rounded-br rounded-tr cursor-pointer">
					<BsSearch className="text-black text-xl mx-3" />
				</div>
			</div>

			{/* LEFT LINKS */}
			<ul
				className={`flex items-center  flex-row-reverse md:flex-row md:gap-5 transition ${
					searchBarFocus ? "hidden md:flex" : "block "
				} `}
			>
				<li className="hidden md:flex items-center gap-1 w-[55px]  ">
					<img
						src={flag_icon}
						alt="indian-flag"
						className="w-[27px] "
					/>
					<span className="font-semibold ">EN</span>
				</li>

				{/* DISPLAY USERNAME */}
				{userName ? (
					<li
						className="group hidden lg:flex items-start flex-col  leading-none whitespace-nowrap relative cursor-pointer select-none "
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						<small className="text-gray-300 font-semibold">
							Hello,{" "}
						</small>
						<div className="uppercase pt-[4px] font-bold">
							{userName}
						</div>
						{isHovered && (
							<div
								className="absolute transition top-12 -left-28 text-gray-800 rounded font-semibold logoutBTN bg-white shadow-2xl flex flex-col z-20 "
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
							>
								<Link
									to="/user_detail"
									className="px-5 mt-1 py-5 hover:bg-gray-100 flex items-center gap-3 z-30"
								>
									<VscAccount className="scale-125" />
									Your Account
								</Link>
								{admin ? (
									""
								) : (
									<>
										<Link
											to="/orders"
											className="px-5  py-5 hover:bg-gray-100 flex items-center gap-3"
										>
											<FiBox className="scale-125" />
											Your Orders
										</Link>
										<Link
											to="/cart"
											className="group px-5 py-5  hover:bg-gray-100 flex items-center gap-3 "
										>
											<LuShoppingCart className="scale-125" />
											Your Cart Items
										</Link>
									</>
								)}
								<div
									onClick={handleLogout}
									className="rounded px-5 py-5 bg-yellow-400 flex items-center gap-3 "
								>
									<TbLogout className="scale-125" />
									Logout
								</div>
							</div>
						)}
					</li>
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
						{currentUser && userCartDetails.length > 0
							? userCartDetails.length
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
							<RiAdminFill className="text-2xl text-orange-400 mr-2 md:mr-0" />
							<span className="hidden md:inline">Dashboard</span>
						</span>
					</NavLink>
				)}
			</ul>
		</nav>
	);
}

export default NavbarFirstRow;
