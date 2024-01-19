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

	// CONTEXT
	const {
		admin,
		setAdmin,
		userName,
		setUserName,
		cartAnimate,
		currentUser,
		setCurrentUser,
		cartItemsRX,
	} = useContext(MyContext);

	// HANDLE SIDEBAR TOGGLE
	const handleSideBar = () => {
		setSidebarToggle(!sidebarToggle);
	};

	function handleCartIcon() {
		const user = localStorage.getItem("user");
		!user && toastLoginToAddCart();
		scrollToTop();
	}

	// ------------------------------------------------------

	return (
		<header className="sticky top-0 shadow-xl z-20">
			{/*FIRST ROW*/}
			<NavbarFirstRow
				handleSideBar={handleSideBar}
				admin={admin}
				userName={userName}
				cartAnimate={cartAnimate}
				toastLogin={toastLoginToAddCart}
				scrollToTop={scrollToTop}
				handleCartIcon={handleCartIcon}
				currentUser={currentUser}
				cartItemsRX={cartItemsRX}
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
				setCurrentUser={setCurrentUser}
			/>
		</header>
	);
}

export default Navbar;
