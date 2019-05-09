// Basket Getters.

import {
  GET_CURRENT_BASKET,
  GET_BASKET_COUNT,
  GET_FRST_THREE_BASKET_ITEMS
} from "../../getter-types";

const _ = require("lodash");

export default {
  // get current basket from Sana.
  // return : basket model
  [GET_CURRENT_BASKET]: (state) => {
    if (state.Basket) {
      return state.Basket;
    }
    return {};
  },

  [GET_FRST_THREE_BASKET_ITEMS]: (state) => {
    if (state.Basket && state.Basket.LinesModel) {
      const basketlines = state.Basket.LinesModel.ProductLines;
      return _.take(basketlines, 3);
    }
    return [];
  },

  [GET_BASKET_COUNT]: (state) => {
    if (state.Basket) {
      return state.Basket.TotalCount;
    }
    return 0;
  }
};
