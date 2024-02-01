// IMPORT COMPONENTS
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// ROUTER COMPONENTS
import { Outlet } from "react-router-dom";

function RootLayout() {
	return (
		<>
			{/* NAVIGATION BAR */}
			<Navbar />

			<main className="min-h-[55vh]">
				{/* RENDER NESTED COMPONENTS */}
				<Outlet />
			</main>

			{/* PAGE FOOTER */}
			<Footer />
		</>
	);
}

export default RootLayout;
