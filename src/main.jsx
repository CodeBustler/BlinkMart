import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// TOASTIFY
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
// REDUX
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*REDUX PROVIDER*/}
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
);
