// basket Actions.

import { FETCH_CURRENT_BASKET } from "../../action-types";
import { SAVE_BASKET_SATE } from "../../mutation-types";
import basketApi from "../../../api/basket-api";

export default {
  // fetch current basket result
  [FETCH_CURRENT_BASKET]: context =>
    new Promise((resolve, reject) => {
      basketApi
        .getCurrentbasket()
        .then((basket) => {
          context.commit(SAVE_BASKET_SATE, basket);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    })
};
