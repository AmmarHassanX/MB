import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;
////////////////////////////////////////////////////////////////
// import {
//   setPrimarySliders,
//   setSecondarySliders,
//   setBanners,
// } from "../store/Home";

// ////////////////////////////////sliders
// export const FetchSliders = () => async (dispatch) => {
//   let id = 1;
//   try {
//     const data1 = await axios.get(
//       `${API_BASE_URL}/home/sliderImages?sliderType=primary&businessTypeId=${id}`
//     );
//     const data2 = await axios.get(
//       `${API_BASE_URL}/home/sliderImages?sliderType=secondary&businessTypeId=${id}`
//     );
//     const data3 = await axios.get(
//       `${API_BASE_URL}/home/sliderImages?sliderType=banner-after-secondary-slider&businessTypeId=${id}`
//     );

//     dispatch(setPrimarySliders(data1?.data?.result));
//     dispatch(setSecondarySliders(data2?.data?.result));
//     dispatch(setBanners(data3?.data?.result));
//   } catch (error) {}
// };
//////////////////////////////////////////////////////////////Tags and products

export const GetAllTags = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/home/productTagList`);

    return data.result;
  } catch (error) {}
};
export const getTagsProducts = async (id, bussinessId) => {
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const { data } = await axios.get(
      `${API_BASE_URL}/home/product/tagId/${id}?page=0&size=10&businessTypeId=${bussinessId}&storeId=${storeId}`
    );

    return data.result;
  } catch (error) {}
};
export const getAllBrands = async () => {
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const { data } = await axios.get(`${API_BASE_URL}/brand/list`);

    return data.result;
  } catch (error) {}
};
export const getBrandsProduct = () => async (dispatch) => {
  try {
    const getStoreIdsData = localStorage.getItem("storeIds");
    const storeId = getStoreIdsData?.storeId || 2;
    const { data } = await axios.get(`${API_BASE_URL}/ecommerce/product/brand?brandIdList=332`);

    return data;
  } catch (error) {
    if (error) return "error";
  }
};

////////////////////////////////////////////contact us////////////////////////////////
export const contactUs = async (dispatch, data) => {
  try {
    // const result = await axios.post(`${API_BASE_URL}/authenticate`, data);

    setAlert("success", "submitted Successfully")(dispatch);

    return true;
  } catch (err) {
    setAlert("error", "Unable to send Form data")(dispatch);
  }
};
