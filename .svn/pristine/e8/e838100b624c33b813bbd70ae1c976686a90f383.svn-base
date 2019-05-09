// Product Geters.

import { GET_PRODUCT_LIST, GET_SEARCHRESYULT_HEARDER, GET_PAGINGINFO } from "../../getter-types";

export default {
  // get product list (item list) form state.
  // return : array of product list items
  [GET_PRODUCT_LIST]: (state) => {
    if (state.ProductList.ListItems) return state.ProductList.ListItems;
    return [];
  },

  // get product list (item list) form state.
  // return : array of product list items
  [GET_PAGINGINFO]: (state) => {
    if (state.ProductList) {
      const response = state.ProductList;
      return {
        DefaultViewMode: response.DefaultViewMode,
        // Keywords: response.Keywords,
        Loading: response.Loading,
        PagingType: response.PagingType,
        Sorting: response.Sorting,
        ViewMode: response.ViewMode,
        ViewModeSwitchEnabled: response.ViewModeSwitchEnabled
      };
    }
    return {};
  },

  // get serch result header.
  // return: result header(total count, etc.)
  [GET_SEARCHRESYULT_HEARDER](state) {
    if (state.ProductList.Loading) return state.ProductList.Loading;
    return [];
  }
};
