// Cotent Mutations.

import { SAVE_CUSTOMER_ACCOUNT_SATE } from "../../mutation-types";

export default {
  // save customer account state in vuex store.(storename: Customer.CustomerAccounts)
  [SAVE_CUSTOMER_ACCOUNT_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.CustomerAccounts = payload;
    }
  }
};
