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
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  // ------------------------------------------------------
  // **************** FUNCTIONS FOR SHARE ****************
  // ------------------------------------------------------

  // USERNAME UPDATE

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

  // ------------------------------------------------------
  // console.log(userDB);
  // console.log(allProducts);
  // console.log(userName);
  // console.log(admin);
  // ------------------------------------------------------

  return (
    <>
      <MyContext.Provider
        value={{ allProducts, userName, setUserName, admin, setAdmin, loading }}
      >
        <RouterProvider router={routes} />
      </MyContext.Provider>
    </>
  );
}

export { MyContext };
export default App;
