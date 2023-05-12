import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

/**
 * A module for the main index of the app that renders the router, provider, and main component
 * @module index
 */

/**
 * ReactDOM.render() that controls the contents of the container node passed in
 * @method render
 *
 * @param {React.FunctionComponentElement<any>} element - The component element to render
 * @param {ReactDOM.Container} container - The container that will hold the component elements
 *
 * @return {void}
 *
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
