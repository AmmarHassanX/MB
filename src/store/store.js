import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";
////////////////////////////////////////////////////////////////////////////
import HomePageslice from "./home";
import ProductSlice from "./products";
import CartPageSlice from "./cart";
import Auth from "./Auth";
import Checkoutslice from "./checkout";

const cartPersistConfig = {
  key: "cartRedux",
  storage,
  whitelist: ["localCartData"],
};
const loginPersistConfig = {
  key: "loginRedux",
  storage,
  whitelist: ["tokens"],
};

const cartReducer = persistReducer(cartPersistConfig, CartPageSlice);
const AuthReducer = persistReducer(loginPersistConfig, Auth);


export const store = configureStore({
  reducer: {
    Home: HomePageslice,
    products: ProductSlice,
    cart: cartReducer,
    auth: AuthReducer,
    checkout: Checkoutslice,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
