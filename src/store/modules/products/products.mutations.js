// Product Mutations.

import {
  UPDATE_PRODUCTS_STATE,
  UPDATE_PRODUCT_STATE,
  UPDATE_LASTVIEWED_ITEMS_STATE
} from "../../mutation-types";

export default {
  // Save Product data to Vuex Store (Store name: ProductList).
  [UPDATE_PRODUCTS_STATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.ProductList = payload;
    }
  },
  [UPDATE_PRODUCT_STATE]: (state, payLoad) => {
    const curentState = state;
    if (payLoad) {
      curentState.Product = payLoad.ProductModel;
    }
  },
  [UPDATE_LASTVIEWED_ITEMS_STATE]: (state, payLoad) => {
    const curentState = state;
    if (payLoad) {
      curentState.LastViewItems = payLoad;
    }
  }
};
