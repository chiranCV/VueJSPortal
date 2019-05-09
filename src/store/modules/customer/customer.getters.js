// Customer Getters.

import { GET_CURRENT_ACCOUNTS } from "../../getter-types";
import sessionManager from "../../../helpers/session-manager";
import config from "../../../config.json";

export default {
  // get customer account list (item list) form state.
  // return : array of customer account list items
  [GET_CURRENT_ACCOUNTS]: (state) => {
    if (state.CustomerAccounts) {
      const sapIdCookiename = config.Cookiekeys.SapId;
      const currentSapId = sessionManager.getCookie(sapIdCookiename);
      const customerAccounts = state.CustomerAccounts;

      if (currentSapId) {
        const selected = customerAccounts.filter(item =>
          item.SAPCustomerNo === currentSapId);

        const rest = customerAccounts.filter(item =>
          item.SAPCustomerNo !== currentSapId);

        if (selected && selected.length === 1) {
          rest.unshift(selected[0]);
          return rest;
        }
      }

      return customerAccounts;
    }
    return [];
  }
};
