import axios from "axios";
import { assign, findIndex, sumBy } from "lodash";
import getConfig from "next/config";
import { setCartData, setCartLoading, setLocalCartData } from "../store/cart";
import { setAlert } from "./alert";

const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
////////////////////////////////////////////////////////////////
// import {
//   setCartData,
//   setCartList,
//   setCartLoading,
//   setLocalCartData,
// } from "../store/cart";
// import { setAlert } from "./alert";

////////////////////cart functions
export const fetchCartData = (token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  const getStoreIdsData = localStorage.getItem("storeIds");
  const storeId = getStoreIdsData?.storeId || 2;
  try {
    try {
      await axios.put(`${API_BASE_URL}/cartDiscount/updateCartLineItemsWithCoupons?storeId=${storeId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {}
    const data = await axios.get(`${API_BASE_URL}/cartLineItem/search?storeId=${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setCartData(data?.data?.result));
    dispatch(setCartLoading(false));
  } catch (err) {
    dispatch(setCartLoading(false));
    setAlert("error", "unable to fetch cart Data")(dispatch);
  }
};

export const addTocart = (selectedProduct, token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const data = await axios.post(`${API_BASE_URL}/cartLineItem?storeId=${storeId}`, selectedProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCartData(token)(dispatch);
    dispatch(setCartLoading(false));
    selectedProduct[0]?.quantity > 0 && setAlert("success", "Product added to cart")(dispatch);
  } catch (err) {
    dispatch(setCartLoading(false));
    setAlert("error", "unable to addTocart")(dispatch);
  }
};

export const deleteProductFromCart = (selectedProduct, token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  let localCart;
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const data = await axios.delete(`${API_BASE_URL}/cartLineItem/clearSelected?storeId=${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: selectedProduct,
      // url: "/cartLineItem/clearSelected",
    });

    fetchCartData(token)(dispatch);

    dispatch(setCartLoading(false));
    setAlert("success", "Item has been Removed from cart")(dispatch);
  } catch (err) {
    dispatch(setCartLoading(false));

    setAlert("error", "unable to update Cart Data")(dispatch);
  }
};

export const updateCartQuantity = (selectedProduct, token) => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const data = await axios.put(`${API_BASE_URL}/cartLineItem/updateAll?storeId=${storeId}`, selectedProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setCartLoading(false));
    fetchCartData(token)(dispatch);
    setAlert("success", "cart updated successfully")(dispatch);
  } catch (err) {
    dispatch(setCartLoading(false));

    setAlert("error", "unable to update Cart Data")(dispatch);
  }
};

/////////////////////////local cart
export const localAddToCart = (products, cartData) => async (dispatch) => {
  // dispatch(setCartLoading(true));

  let localProducts = cartData?.cartLineItemDtoList ?? [];
  if (products?.length > 0) {
    for (const product of products) {
      const existingProductIndex = findIndex(localProducts, (data) => data?.productId === product?.productId);
      if (existingProductIndex !== -1) {
        const existingProduct = localProducts[existingProductIndex];
        const modifyProduct = { ...existingProduct, quantity: existingProduct?.quantity + product?.quantity };
        localProducts = [
          ...localProducts.slice(0, existingProductIndex),
          modifyProduct,
          ...localProducts.slice(existingProductIndex + 1),
        ];
      } else {
        localProducts = [...localProducts, product];
      }
    }
  }

  const localCart = {
    cartLineItemDtoList: localProducts || [],
    totalCartPrice: sumBy(localProducts, (o) => (o?.standardPriceWithoutDiscount || o?.standardPrice) * o?.quantity),
    totalCartQuantity: sumBy(localProducts, "quantity"),
  };
  dispatch(setLocalCartData(localCart));
  setAlert("success", "Product added to cart")(dispatch);
  dispatch(setCartLoading(false));
};

export const RemoveLocalProduct = (product, cartData) => async (dispatch) => {
  dispatch(setCartLoading(true));
  let localCart;

  let cartLineItemDtoList = cartData?.cartLineItemDtoList;
  let list = cartLineItemDtoList?.filter((id) => id?.productId !== product?.productId);
  localCart = {
    cartLineItemDtoList: list || [],
    totalCartPrice: sumBy(list, (o) => (o?.standardPriceWithoutDiscount || o?.standardPrice) * o?.quantity),
    totalCartQuantity: sumBy(list, "quantity"),
  };

  dispatch(setLocalCartData(localCart));
  setAlert("success", "cart updated successfully")(dispatch);
  dispatch(setCartLoading(false));
};

export const updateLocalCart = (product, cartData, type, quantity) => async (dispatch) => {
  // dispatch(setCartLoading(true));
  let localCart;

  let cartLineItemDtoList = cartData?.cartLineItemDtoList;
  // let enteringkey = cartLineItemDtoList.findIndex((pr) => pr.id === product.id);
  const enteringkey = cartLineItemDtoList.findIndex((object) => {
    return object.productId === product.productId;
  });
  let array = [...cartLineItemDtoList];
  // let list = cartLineItemDtoList.filter(
  //   (id) => id.productId !== product.productId
  // );
  array.splice(enteringkey, 1, product);
  localCart = {
    cartLineItemDtoList: array || [],
    totalCartPrice: sumBy(array, (o) => (o?.standardPriceWithoutDiscount || o?.standardPrice) * o?.quantity),
    totalCartQuantity: sumBy(array, "quantity"),
  };

  dispatch(setLocalCartData(localCart));
  setAlert("success", "cart updated successfully")(dispatch);
  // dispatch(setCartLoading(false));
};

export const updateLocalCartOnChange = (product, cartData, type, quantity) => async (dispatch) => {
  // dispatch(setCartLoading(true));
  let localCart;

  let cartLineItemDtoList = cartData?.cartLineItemDtoList;
  const enteringkey = cartLineItemDtoList.findIndex((object) => {
    return object.productId === product.productId;
  });
  let array = [...cartLineItemDtoList];
  array.splice(enteringkey, 1, product);

  localCart = {
    cartLineItemDtoList: array || [],
    totalCartPrice: sumBy(array, (o) => (o?.standardPriceWithoutDiscount || o?.standardPrice) * o?.quantity),
    totalCartQuantity: sumBy(array, quantity),
  };

  dispatch(setLocalCartData(localCart));
  setAlert("success", "cart updated successfully")(dispatch);
  // dispatch(setCartLoading(false));
};
