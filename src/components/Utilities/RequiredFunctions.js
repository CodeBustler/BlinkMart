import { toast } from "react-toastify";

// ------------------------------------------------------

// TOAST FUNCTIONS
export const toastProductAddedToDB = () =>
	toast.success("Product Added To Database !");

export const toastLoginToAddCart = () =>
	toast.info("Log in to add items to your cart");

export const toastAddedToCart = () => toast.success("Added To Cart !");
export const toastLoginSuccess = () => toast.success("Login Success !");
export const toastLogout = () => toast.error("Logout !");
export const toastSignUpSuccess = () => toast.success("SignUp Success !");
export const toastItemRemoved = () => toast.error("Item Removed ! ");
export const toastItemAlreadyInCart = () =>
	toast.info("Item already in a cart ! ");

// SCROLL TOP TOP
export const scrollToTop = () => {
	window.scrollTo(0, 0);
};

//  NUMBERS WITH COMMAS
export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// useEffect(() => {
//   const getCurrentUserCart = async () => {
//     if (currentUser?.length === 0) {
//       console.log("Guest");
//     } else {
//       console.log(currentUser?.length);
//     }

//     if (currentUser && currentUser.length > 0) {
//       const cartFromFB = currentUser[0].cart;
//       const itemsToAdd = [];

//       try {
//         // Accumulate items to add
//         cartFromFB.userCartProducts.forEach((item) => {
//           itemsToAdd.push(item);
//         });

//         // Update state outside the loop
//         setCartItemsFromFB((prevValue) => {
//           itemsToAdd.forEach((item) => {
//             dispatchFBCartItem(addToCart(item));
//           });
//           return [...prevValue, ...itemsToAdd];
//         });
//       } catch (error) {
//         console.error("Error adding items to cart:", error);
//       }
//     }
//   };

//   getCurrentUserCart();
// }, [currentUser, dispatchFBCartItem]);
