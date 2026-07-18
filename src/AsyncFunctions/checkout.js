import axios from "axios";
import getConfig from "next/config";
import { setStates } from "../store/checkout";
const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
import { setAlert } from "./alert";
import { getUserDetails } from "./Auth";
import { fetchCartData } from "./cart";
/////////////////////checkout functions //////////////////////

export const fetchState = (countryCode) => async (dispatch) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/country/${countryCode}/allState`);
    return data?.data?.result;
  } catch (err) {
    setAlert("error", "unable to fetch the states")(dispatch);
  }
};
export const fetchCountries = () => async (dispatch) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/country/all`);
    return data?.data?.result;
  } catch (err) {
    setAlert("error", "unable to fetch the countries")(dispatch);
  }
};
export const fetchShippingOptions = async (dispatch, token) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/shipping/options`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
    // dispatch(setShippingOptions(data?.data?.result));
  } catch (err) {
    setAlert("error", "unable to fetch shippingOptions")(dispatch);
  }
};
export const fetchPaymentOptions = async (dispatch, token) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/store/paymentMode`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
    // dispatch(setpaymentOptions(data?.data?.result));
  } catch (err) {
    setAlert("error", "unable to fetch payment methods")(dispatch);
  }
};

export const AddStore = (data, token) => async (dispatch) => {
  try {
    const result = await axios.post(`${API_BASE_URL}/ecommerce/customer/store`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    getUserDetails(token)(dispatch);
    setAlert("success", "Added store successfully")(dispatch);
    return result;
  } catch (err) {
    setAlert("error", "Unable to create a store")(dispatch);
  }
};
export const addNewAddress = (data, token) => async (dispatch) => {
  try {
    const result = await axios.post(`${API_BASE_URL}/customer/address`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    getUserDetails(token)(dispatch);
    setAlert("success", "Added new Address successfully")(dispatch);
    return result;
  } catch (err) {
    setAlert("error", "Unable to add New address")(dispatch);
  }
};
