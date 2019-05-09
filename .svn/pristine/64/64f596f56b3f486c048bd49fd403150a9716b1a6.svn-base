// content Actions.

import { FETCH_ALL_CUSTOMER_ACCOUNT } from "../../action-types";
import { SAVE_CUSTOMER_ACCOUNT_SATE } from "../../mutation-types";
import customerApi from "../../../api/customer-api";

export default {
  // fetch customer account reult
  // calling APi if cookie not exsist
  [FETCH_ALL_CUSTOMER_ACCOUNT]: (context, zfloginId) =>
    new Promise((resolve, reject) => {
      customerApi
        .getCustomerAccounts(zfloginId)
        .then((accountResult) => {
          context.commit(SAVE_CUSTOMER_ACCOUNT_SATE, accountResult);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    })
};
