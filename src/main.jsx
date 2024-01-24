import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// TOASTIFY
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
// REDUX
import { Provider } from "react-redux";

// REDUX (NOT IN USE)
// import { store } from "./redux/store";
// <Provider store={store}></Provider>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*TOAST CONTAINER*/}
    <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <App />
  </React.StrictMode>,
);
