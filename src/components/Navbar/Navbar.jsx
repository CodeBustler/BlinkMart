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
// FIREBASE & ROUTER
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebase";
import { useNavigate } from "react-router-dom";
// ------------------------------------------------------

function Navbar() {
	const [sidebarToggle, setSidebarToggle] = useState(true);
	const {
		// CONTEXT
		admin,
		setAdmin,
		userName,
		setUserName,
		cartAnimate,
		currentUser,
		setCurrentUser,
		cartItemsRX,
	} = useContext(MyContext);
	const navigateTo = useNavigate();

	// ------------------------------------------------------
	// *************** HANDLE LOGOUT FUNCTION ***************
	// ------------------------------------------------------
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				setUserName(null);
				setAdmin(false);
				setCurrentUser(null);
				userName && toastLogout();
				localStorage.removeItem("user");
				navigateTo("/login");
				console.log("%c ✔ Signed out successfully", "color:#bada55");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// ------------------------------------------------------
	// ****************** OTHER FUNCTIONS ******************
	// ------------------------------------------------------
	// HANDLE FOR FOR GUEST (PROTECTED CART COMPONENTS)
	function handleCartIcon() {
		const user = localStorage.getItem("user");
		!user && toastLoginToAddCart();
		scrollToTop();
	}

	// HANDLE SIDEBAR TOGGLE
	const handleSideBar = () => {
		setSidebarToggle(!sidebarToggle);
	};

	// ------------------------------------------------------
	return (
		<header className="sticky top-0 shadow-xl z-20">
			{/*FIRST ROW*/}
			<NavbarFirstRow
				handleSideBar={handleSideBar}
				admin={admin}
				userName={userName}
				cartAnimate={cartAnimate}
				handleCartIcon={handleCartIcon}
				currentUser={currentUser}
				cartItemsRX={cartItemsRX}
				handleLogout={handleLogout}
			/>

			{/*SECOND ROW*/}
			<NavbarSecondRow handleSideBar={handleSideBar} />

			{/*SIDEBAR*/}
			<SideBar
				sidebarToggle={sidebarToggle}
				handleSideBar={handleSideBar}
				handleLogout={handleLogout}
				userName={userName}
				admin={admin}
			/>
		</header>
	);
}

export default Navbar;
