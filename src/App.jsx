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
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userDB, setUserDB] = useState([]);
  const [userUID, setUserUID] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartAnimate, setCartAnimate] = useState(false);

  // ------------------------------------------------------
  // **************** FUNCTIONS FOR SHARE ****************
  // ------------------------------------------------------

  // GET ALL PRODUCTS
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

  // GET ALL USERDATA
  const fetchUserData = async () => {
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
    setUserDB(userDataArray);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  // UPDATE USERNAME & ADMIN ON AUTH STATE CHANGE
  useEffect(() => {
    const updateUserNameAndAdmin = async (user) => {
      const env = await import.meta.env;
      const adminEmail = env.VITE_REACT_APP_ADMIN_EMAIL;

      if (user) {
        setUserName(user.displayName);
        setUserUID(user.uid);
        setAdmin(user.email === adminEmail);
      } else {
        setUserName(null);
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

  // HANDLE NAVBAR CART ICON ANIMATION (PRODUCT_CARD & NAVBAR)
  const handleCartAnimate = () => {
    setCartAnimate((prevCartAnimate) => !prevCartAnimate);
    setTimeout(() => {
      setCartAnimate((prevCartAnimate) => !prevCartAnimate);
    }, 1500);
  };

  // ------------------------------------------------------
  // console.log(currentUser?.length > 0 ? currentUser : "Loading");
  // console.log(allProducts);
  // console.log(userName);
  // console.log(userUID);
  // console.log(admin);
  console.log(userDB);

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
          cartAnimate,
          handleCartAnimate,
          userCart,
          currentUser,
        }}
      >
        <RouterProvider router={routes} />
      </MyContext.Provider>
    </>
  );
}

export { MyContext };
export default App;
