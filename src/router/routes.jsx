// ROUTER
import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

// COMPONENTS & PAGES
import RootLayout from "./RootLayout";
import HomePage from "../Pages/HomePage";
import ProductDetail from "../components/Products/ProductDetail";
import ProductsCategory from "../components/Products/ProductsCategory";
import ProductsSubCategory from "../components/Products/ProductsSubCategory";
import NoPage from "../Pages/NoPage";
import Dashboard from "../components/Dashboard/Dashboard";
import AddProduct from "../components/Dashboard/AddProduct";
import SignUp from "../components/Authentication/SignUp";
import Login from "../components/Authentication/Login";
import Cart from "../components/Cart/Cart";
import CustomerService from "../Pages/CustomerService";
import Orders from "../components/Orders/orders";
import UserDetail from "../components/UserDetail/UserDetail";
import UpdateProduct from "../components/Dashboard/UpdateProduct";
import SearchProducts from "../components/Products/SearchProducts";
// ------------------------------------------------------
// **************** PROTECT ROUTES ****************
// ------------------------------------------------------

// PROTECTED ROUTE FOR USER
const ProtectedRoute = ({ children }) => {
	const userLocal = localStorage.getItem("user");
	if (userLocal) {
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

// PROTECTED ROUTE FOR ADMIN DASHBOARD
const env = import.meta.env;
const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;
const ProtectedRouteForAdmin = ({ children }) => {
	const userLocal = JSON.parse(localStorage.getItem("user"));

	if (userLocal && userLocal.user && userLocal.user.email === adminEmail) {
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

// ------------------------------------------------------
// **************** ROUTES FOR ROUTER ****************
// ------------------------------------------------------
const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<RootLayout />}>
				<Route index element={<HomePage />} />
				<Route
					path="/cart"
					element={
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/productDetail/:productId"
					element={<ProductDetail />}
				/>
				<Route
					path="/ProductsCategory/:categoryName"
					element={<ProductsCategory />}
				/>
				<Route
					path="/ProductsSubCategory/:subCategoryName"
					element={<ProductsSubCategory />}
				/>
				<Route path="/customer_service" element={<CustomerService />} />
				<Route path="/orders" element={<Orders />} />
				<Route
					path="/user_detail"
					element={
						<ProtectedRoute>
							<UserDetail />
						</ProtectedRoute>
					}
				/>
				<Route path="/searchResults" element={<SearchProducts />} />
			</Route>
			<Route path="/*" element={<NoPage />} />
			<Route
				path="/dashboard"
				element={
					<ProtectedRouteForAdmin>
						<Dashboard />
					</ProtectedRouteForAdmin>
				}
			/>
			<Route
				path="/addProduct"
				element={
					<ProtectedRouteForAdmin>
						<AddProduct />
					</ProtectedRouteForAdmin>
				}
			/>
			<Route
				path="/updateProduct/:productId"
				element={
					<ProtectedRouteForAdmin>
						<UpdateProduct />
					</ProtectedRouteForAdmin>
				}
			/>

			<Route path="/signup" element={<SignUp />} />
			<Route path="/login" element={<Login />} />
		</Route>,
	),
);

export { routes };
