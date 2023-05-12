import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

/**
 * A module for creating store using redux
 * @module store
 */

/**
 * Middleware that allows to return functions, rather than just actions, within Redux
 * @constant middleware
 */
const middleware = [thunk];

/**
 * Creates a Redux store that holds the complete state tree of the app
 * @constant store
 */
const store = configureStore(
  {
    reducer: rootReducer,
  },
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
