// ROUTER
import { Outlet } from "react-router-dom";
// COMPONENTS
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

// ------------------------------------------------------

function RootLayout() {
	return (
		<>
			<Navbar />
			<main className="p-5 min-h-[50vh]">
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default RootLayout;
