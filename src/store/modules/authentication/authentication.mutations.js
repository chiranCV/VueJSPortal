// API Authentication  mutations.
import { SAVE_AUTH_TOKEN_SATE, CLEAR_AUTH_TOKEN } from "../../mutation-types";

export default {
  // save basket state in vuex store.(storename: Basket)
  [SAVE_AUTH_TOKEN_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.Token = payload;
    }
  },

  [CLEAR_AUTH_TOKEN]: (state) => {
    const currentState = state;
    if (currentState.Token) currentState.Token = null;
  }
};
