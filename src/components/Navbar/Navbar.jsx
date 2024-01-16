import { useContext, useState } from "react";
import { MyContext } from "../../App.jsx";
// COMPONENTS
import NavbarFirstRow from "./navbar_components/NavbarFirstRow";
import NavbarSecondRow from "./navbar_components/NavbarSecondRow";
import SideBar from "./navbar_components/SideBar";
import {
	scrollToTop,
	toastLoginToAddCart,
	toastLogout,
} from "../utilities/RequiredFunctions";

// ------------------------------------------------------

function Navbar() {
	const [sidebarToggle, setSidebarToggle] = useState(true);
	const [cartAnimate, setCartAnimate] = useState(false);

	// CONTEXT
	const { admin, setAdmin, userName, setUserName } = useContext(MyContext);

	// HANDLE SIDEBAR TOGGLE
	const handleSideBar = () => {
		setSidebarToggle(!sidebarToggle);
	};

	// HANDLE NAVBAR CART ICON ANIMATION
	const handleCartAnimate = () => {
		setCartAnimate((prevCartAnimate) => !prevCartAnimate);
		setTimeout(() => {
			setCartAnimate((prevCartAnimate) => !prevCartAnimate);
		}, 1500);
	};

	function handleCartIcon() {
		const user = localStorage.getItem("user");
		!user && toastLoginToAddCart();
		scrollToTop();
	}

	// ------------------------------------------------------

	return (
		<header className="sticky top-0 shadow-xl z-10">
			{/*FIRST ROW*/}
			<NavbarFirstRow
				handleSideBar={handleSideBar}
				admin={admin}
				// cartItems={cartItems}
				cartAnimate={cartAnimate}
				toastLogin={toastLoginToAddCart}
				scrollToTop={scrollToTop}
				handleCartIcon={handleCartIcon}
			/>
			{/*SECOND ROW*/}
			<NavbarSecondRow handleSideBar={handleSideBar} />
			{/*SIDEBAR*/}
			<SideBar
				sidebarToggle={sidebarToggle}
				handleSideBar={handleSideBar}
				userName={userName}
				admin={admin}
				setAdmin={setAdmin}
				setUserName={setUserName}
			/>
		</header>
	);
}

export default Navbar;
