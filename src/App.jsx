import { createContext, useEffect, useState } from "react";
// ROUTER
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
// FIREBASE
import { auth, fireDB } from "./firebaseConfig/firebase";
import { collection, getDocs } from "firebase/firestore";
// CONTEXT API
const MyContext = createContext();

// ------------------------------------------------------

function App() {
  // PRODUCTS & LOADING
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  // USER RELATED
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userDB, setUserDB] = useState([]);
  const [userUID, setUserUID] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  // CART RELATED
  const [cartAnimate, setCartAnimate] = useState(false);
  const [userCartItems, setUserCartItems] = useState([]);
  const [userCartItemsCount, setUserCartItemsCount] = useState([]);

  // ------------------------------------------------------
  // ***************** GET ALL PRODUCTS *****************
  // ------------------------------------------------------
  const fetchProducts = async () => {
    setLoading(true);
    const data = await getDocs(collection(fireDB, "allProducts"));
    const productData = [];
    data.forEach((doc) => {
      productData.push({ ...doc.data(), id: doc.id });
    });
    setLoading(false);
    setAllProducts(productData); // ALL PRODUCTS
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------------------------------------------
  // ************* UPDATE USER_AUTH & ADMIN *************
  // ------------------------------------------------------
  useEffect(() => {
    const updateUserNameAndAdmin = async (user) => {
      const env = await import.meta.env;
      const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

      if (user) {
        setUserName(user.displayName);
        setUserUID(user.uid);
        setAdmin(user.email === adminEmail);
      } else {
        setUserName("");
        setUserUID(null);
      }
    };

    const unsubscribeAuthStateChanged = auth.onAuthStateChanged(
      updateUserNameAndAdmin,
    );

    return () => {
      unsubscribeAuthStateChanged();
    };
  }, [userUID, userDB]);

  // ------------------------------------------------------
  // ****************** GET ALL USERDATA ******************
  // ------------------------------------------------------
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getDocs(collection(fireDB, "users"));
      const userDataArray = [];

      userData.forEach((doc) => {
        userDataArray.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setLoading(false);
      setUserDB(userDataArray); // All USER_DATABASE

      // *************** CURRENT USER CART DATA ***************
      const userCart = userDataArray.filter((item) => item.uid === userUID);

      if (userCart.length > 0 && userCart[0].cart) {
        setLoading(false);
        setUserCartItems(userCart[0].cart.userCartProducts);
        setUserCartItemsCount(userCart[0].cart.userCartProductsCount);
      } else {
        // Handle the case when userCart is empty or does not have 'cart' property
        setLoading(false);
        setUserCartItems([]);
        setUserCartItemsCount(0);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userUID]);

  // ****************** CURRENT USER DATA ******************
  useEffect(() => {
    if (userUID && userDB.length > 0) {
      const currentUserDetail = userDB.filter((item) => item.uid == userUID);
      if (currentUserDetail.length > 0) {
        setCurrentUser(currentUserDetail);
      } else {
        setCurrentUser(null);
      }
    }
  }, [userUID, userDB]);

  // ------------------------------------------------------
  // ****************** OTHER FUNCTIONS ******************
  // ------------------------------------------------------
  // CART ICON_ANIMATION (FOR PRODUCT_CARD & NAVBAR)
  const handleCartAnimate = () => {
    setCartAnimate((prevCartAnimate) => !prevCartAnimate);
    setTimeout(() => {
      setCartAnimate((prevCartAnimate) => !prevCartAnimate);
    }, 1500);
  };

  // ------------------------------------------------------
  // console.log(allProducts);
  // console.log(userName);
  // console.log(userUID);
  // console.log(admin);
  // console.log(userDB);
  // console.log(userCartItems);
  // console.log(userCartItemsCount);
  // ------------------------------------------------------

  return (
    <>
      <MyContext.Provider
        value={{
          allProducts,
          userName,
          setUserName,
          admin,
          setAdmin,
          loading,
          setLoading,
          cartAnimate,
          handleCartAnimate,
          currentUser,
          setCurrentUser,
          userUID,
          userCartItems,
          userCartItemsCount,
        }}
      >
        <RouterProvider router={routes} />
      </MyContext.Provider>
    </>
  );
}

export { MyContext };
export default App;
