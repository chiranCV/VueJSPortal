// basket Mutations.

import { SAVE_BASKET_SATE } from "../../mutation-types";

export default {
  // save basket state in vuex store.(storename: Basket)
  [SAVE_BASKET_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.Basket = payload;
    }
  }
};
