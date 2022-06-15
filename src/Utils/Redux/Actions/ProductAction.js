import axios from "axios";

import {
  ALL_PRODS_REQ,
  ALL_PRODS_SUCCESS,
  ALL_PRODS_FAILED,
  CLEAR_ERRORS,
  PROD_DETAILS_REQ,
  PROD_DETAILS_SUCCESS,
  PROD_DETAILS_FAILED,
} from "../../Consts/ConstArgs";

export const getProducts =
  (keyword = "", currentPage = 1, price) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODS_REQ });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
      const { data } = await axios.get(link);
      dispatch({ type: ALL_PRODS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODS_FAILED,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROD_DETAILS_REQ });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PROD_DETAILS_SUCCESS, payload: data.targetedProduct });
  } catch (error) {
    dispatch({
      type: PROD_DETAILS_FAILED,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
