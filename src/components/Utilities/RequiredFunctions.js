import { toast } from "react-toastify";

// ------------------------------------------------------
// ****************** TOAST FUNCTIONS ******************
// ------------------------------------------------------
export const toastProductAddedToDB = () =>
	toast.success("Product Added To Database !");
export const toastLoginToAddCart = () =>
	toast.info("Log in to add items to your cart");
export const toastItemAlreadyInCart = () =>
	toast.info("Item already in a cart ! ");

export const toastAddedToCart = () => toast.success("Added To Cart !");
export const toastLoginSuccess = () => toast.success("Login Success !");
export const toastLogout = () => toast.error("Logout !");
export const toastSignUpSuccess = () => toast.success("SignUp Success !");
export const toastItemRemoved = () => toast.error("Item Removed ! ");
export const toastClearCart = () => toast.error("Cart cleared successfully ");
export const toastProductUpdated = () => toast.success("Product Updated");
export const toastProductDelete = () =>
	toast.error("Product deleted from database ! ");

// ------------------------------------------------------
// ****************** OTHER FUNCTIONS ******************
// ------------------------------------------------------
// SCROLL TOP TOP
export const scrollToTop = () => {
	window.scrollTo(0, 0);
};

//  NUMBERS WITH COMMAS
export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// CALCULATE DISCOUNT PERCENTAGE
export const calculateDiscountPercentage = (item) => {
	if (!item || !item.price || !item.actualPrice) {
		return "";
	}

	const price = parseFloat(item.price);
	const actualPrice = parseFloat(item.actualPrice);
	// DISCOUNT FORMULA
	return (((actualPrice - price) / actualPrice) * 100).toFixed(0);
};
