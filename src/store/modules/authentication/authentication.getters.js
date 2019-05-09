// API Authentication  getters.

import { GET_AUTH_TOKEN } from "../../getter-types";

export default {
  // get current Api auth token.
  // return :token
  [GET_AUTH_TOKEN]: (state) => {
    if (state.Token) {
      return state.Token;
    }
    return {};
  }
};
