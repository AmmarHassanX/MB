import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
////////////////////////////////////////////////////////////////
// import { setBussiness } from "../store/Home";

///////////////////////navbar////////////////////

export const getBussiness = async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/store/businessType`);
    dispatch(setBussiness(data.result));
    return data.result;
  } catch (error) {}
};
export const FetchNavData = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/menu?businessTypeId=${id}`);

    return data.result;
  } catch (error) {}
};
export const FetchSearchData = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/ecommerce/product/searchByProductOrCategory?searchInput=${id}`);

    return data.result;
  } catch (error) {}
};
