import axios from "axios";
import getConfig from "next/config";
import { setToken, setUserDetails, toggleLoading } from "../store/Auth";
import { setLocalCartData } from "../store/cart";
import { store } from "../store/store";
import { setAlert } from "./alert";
import { addTocart } from "./cart";

const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
////////////////////////////////////////////////

/////////login function
export const LoginFunction = (data) => async (dispatch) => {
  dispatch(toggleLoading(true));
  const state = store?.getState();

  try {
    const result = await axios.post(`${API_BASE_URL}/authenticate`, data);
    dispatch(
      setToken({
        token: result?.data?.result?.access,
        retoken: result?.data?.result?.refresh,
      })
    );
    const token = result?.data?.result?.access;
    if (token && state?.cart?.localCartData?.cartLineItemDtoList?.length > 0) {
      dispatch(addTocart(state?.cart?.localCartData?.cartLineItemDtoList, token));
      dispatch(setLocalCartData(null));
    }
    setAlert("success", "Login successful")(dispatch);

    const childCustomers = await getChildCustomers({ token });
    if (childCustomers?.data?.result?.length) {
      window.location.replace("/account/switchUser");
    }

    return true;
  } catch (err) {
    setAlert("error", "Invalid Credentials")(dispatch);
  }
  dispatch(toggleLoading(false));
};

export const switchUserFunction =
  ({ childCustomerId, token }) =>
  async (dispatch) => {
    dispatch(toggleLoading(true));
    const state = store?.getState();
    try {
      const result = await axios.get(
        `${API_BASE_URL}/ecommerce/customer/tokenForChild?childCustomerId=${childCustomerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setToken({
          token: result?.data?.result?.access,
          retoken: result?.data?.result?.refresh,
        })
      );
      const newToken = result?.data?.result?.access;
      await getUserDetails(newToken)(dispatch);
      if (newToken && state?.cart?.localCartData?.cartLineItemDtoList?.length > 0) {
        dispatch(addTocart(state?.cart?.localCartData?.cartLineItemDtoList, newToken));
        dispatch(setLocalCartData(null));
      }
      setAlert("success", "Switch user successfully")(dispatch);
      return true;
    } catch (err) {
      setAlert("error", err?.response?.data?.error?.details || "Error in switching user")(dispatch);
    }
    dispatch(toggleLoading(false));
  };

export const getChildCustomers = async ({ token }) => {
  try {
    const result = await axios.get(`${API_BASE_URL}/ecommerce/customer/child`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result;
  } catch (err) {
    return false;
  }
};

export const getUserDetails = (token) => async (dispatch) => {
  try {
    const result = await axios.get(`${API_BASE_URL}/ecommerce/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setUserDetails(result.data.result));
    return true;
  } catch (err) {
    const state = store?.getState();
    const token = state?.auth?.tokens?.token;
    const retoken = state?.auth?.tokens?.retoken;
    if (retoken) {
      try {
        const result = await axios.post(`${API_BASE_URL}/refreshToken`, null, {
          headers: { refreshToken: retoken, Authorization: `Bearer ${token}` },
        });
        if (result?.data?.result?.access) {
          dispatch(
            setToken({
              token: result?.data?.result?.access,
              retoken: result?.data?.result?.refresh,
            })
          );
          if (window) {
            window?.location?.reload();
          }
          const customerData = await axios.get(`${API_BASE_URL}/ecommerce/customer`, {
            headers: { Authorization: `Bearer ${result?.data?.result?.access}` },
          });
          dispatch(setUserDetails(customerData?.data.result));
        }
      } catch (error) {
        dispatch(setUserDetails(null));
        return false;
      }
    }
    return false;
  }
};
/////////////forget password
export const forgetPassword = (email) => async (dispatch) => {
  try {
    const data = await axios.post(`${API_BASE_URL}/ecommerce/customer/sendForgotPasswordEmail?email=${email}`);
    setAlert("success", "Link has been sent to your Email")(dispatch);
    return true;
  } catch (error) {
    setAlert("error", "Something went wrong!")(dispatch);
    return false;
  }
};

export const resetPassword = (password, confirmPassword, email, token) => async (dispatch) => {
  let body = {
    password,
    confirmPassword,
  };

  try {
    await axios.post(`${API_BASE_URL}/ecommerce/customer/resetPassword?email=${email}&token=${token}`, body);
    setAlert("success", "Your Password is updated successfully!")(dispatch);
    return true;
  } catch (error) {
    setAlert("error", "Something went wrong!")(dispatch);
    return false;
  }
};

/////////////////register
export const getSalesmanDetails = async (dispatch) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/ecommerce/employee/list?size=1000`);

    return data?.data?.result?.content;
  } catch (err) {
    setAlert("error", "unables to get salesman's data")(dispatch);
  }
};
export const fetchCountries = async (dispatch) => {
  try {
    const data = await axios.get(`${API_BASE_URL}/country/all`);

    return data?.data?.result;
  } catch (err) {
    setAlert("error", "unables to get salesman's data")(dispatch);
  }
};
export const register = (details) => async (dispatch) => {
  dispatch(toggleLoading(true));
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    address1,
    address2,
    city,
    country,
    state,
    zip,
    websiteReference,
    taxId,
    tobaccoId,
    feinNumber,
    voidCheckNumber,
    drivingLicenseNumber,
    company,
    dbaName,
    referBySalesRep,
    businessLicense,
    tobaccoLicense,
    feinLicense,
    drivingLicense,
    voidCheck,
  } = details;

  const userDetails = {
    customerStoreAddressList: [
      {
        address1,
        address2,
        city,
        countryId: country,
        stateId: state,
        zip,
      },
    ],
    firstName,
    lastName,
    email,
    password,
    phone,
    company,
    dbaName,
    primaryBusinessName: "vape store",
    taxId,
    tobaccoId,
    feinNumber,
    drivingLicenseNumber,
    referBySalesRep,
    websiteReference,
    voidCheckNumber,
  };

  let bodyFormData = new FormData();
  businessLicense?.[0] && bodyFormData.append("businessLicense", businessLicense?.[0], businessLicense?.[0]?.name);
  tobaccoLicense?.[0] && bodyFormData.append("tobaccoLicense", tobaccoLicense?.[0], tobaccoLicense?.[0]?.name);
  feinLicense?.[0] && bodyFormData.append("feinLicense", feinLicense?.[0], feinLicense?.[0]?.name);
  drivingLicense?.[0] && bodyFormData.append("drivingLicense", drivingLicense?.[0], drivingLicense?.[0]?.name);
  voidCheck?.[0] && bodyFormData.append("voidCheck", voidCheck?.[0], voidCheck?.[0]?.name);
  bodyFormData.append("customerObj", JSON.stringify(userDetails));

  try {
    await axios.post(`${API_BASE_URL}/ecommerce/customer/withDocuments`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: `application/json, text/plain`,
      },
    });
    dispatch(toggleLoading(false));
    setAlert(
      "success",
      "We have received your wholesale application, please check your email for further details!"
    )(dispatch);
    return true;
  } catch (err) {
    setAlert("error", err?.response?.data?.error?.details || "Unable to signup", { autoClose: false })(dispatch);
    dispatch(toggleLoading(false));
    return false;
  }
};
