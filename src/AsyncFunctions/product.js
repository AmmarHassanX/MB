import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
////////////////////////////////////////////////////////////////
// import {
//   setProductDetail,
//   setRelatedProducts,
//   toggleDetailsLoading,
// } from "../store/products";

///////////////////product details/////////////////
export const getProductsDetails = (id) => async (dispatch) => {
  dispatch(toggleDetailsLoading(true));
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeIdList = getStoreIdsData?.storeIds?.map((data) => data?.id)?.join(",") || 2;
    const data = await axios.get(`${API_BASE_URL}/ecommerce/product/${id}?storeIds=${storeIdList}`);

    if (data.status === 200) {
      dispatch(setProductDetail(data.data.result));
    } else {
      dispatch(toggleProductDetailsNotFound(true));
    }
    dispatch(toggleDetailsLoading(false));
  } catch (error) {
    dispatch(toggleDetailsLoading(true));
  }
};
export const getRelatedProducts = (id) => async (dispatch) => {
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeIdList = getStoreIdsData?.storeIds?.map((data) => data?.id)?.join(",") || 2;
    const data = await axios.get(`${API_BASE_URL}/ecommerce/product/${id}/relatedProduct?storeIds=${storeIdList}`);
    // /ecommerce/product/25737/relatedProduct?storeIds=1
    if (data.status === 200) {
      dispatch(setRelatedProducts(data.data.result));
    }
  } catch (error) {
    dispatch(toggleDetailsLoading(true));
  }
};
