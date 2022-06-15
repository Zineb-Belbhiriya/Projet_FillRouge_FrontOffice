import {
  ALL_PRODS_REQ,
  ALL_PRODS_SUCCESS,
  ALL_PRODS_FAILED,
  CLEAR_ERRORS,
  PROD_DETAILS_SUCCESS,
  PROD_DETAILS_REQ,
  PROD_DETAILS_FAILED,
} from "../../Consts/ConstArgs";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODS_REQ:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
      };

    case ALL_PRODS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PROD_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      };

    case PROD_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PROD_DETAILS_FAILED:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
