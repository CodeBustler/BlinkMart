import { toast } from "react-toastify";

// ------------------------------------------------------

// TOAST FUNCTIONS
export const toastProductAddedToDB = () =>
	toast.success("Product Added To Database !");

export const toastLoginToAddCart = () =>
	toast.info("Log in to add items to your cart");

export const toastLoginSuccess = () => toast.success("Login Success !");
export const toastLogout = () => toast.error("Logout !");
export const toastSignUpSuccess = () => toast.success("SignUp Success !");

// SCROLL TOP TOP
export const scrollToTop = () => {
	window.scrollTo(0, 0);
};

//  NUMBERS WITH COMMAS
export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
