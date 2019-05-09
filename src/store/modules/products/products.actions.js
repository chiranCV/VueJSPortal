// Product Actions.

import productApi from "../../../api/product-api";
import basketApi from "../../../api/basket-api";

import {
  FETCH_SEARCH_RESULT,
  FETCH_SEARCH_SUGGESTIONS,
  FETCH_PRODUCT_DETAIL,
  FETCH_GLOBAL_INVENTORY,
  FETCH_LASTVIEWED_ITEMS,
  ADD_PRODUCT_TO_BASKET
} from "../../action-types";
import {
  UPDATE_PRODUCTS_STATE,
  UPDATE_PRODUCT_STATE,
  UPDATE_LASTVIEWED_ITEMS_STATE
} from "../../mutation-types";

export default {
  // fetch serch reult.
  [FETCH_SEARCH_RESULT]: (context, listOptions) =>
    new Promise((resolve, reject) => {
      productApi
        .getProductList(
          listOptions.query,
          listOptions.pageno,
          listOptions.pagesize,
          listOptions.orderBy,
          listOptions.asec
        )
        .then((searchResult) => {
          context.commit(UPDATE_PRODUCTS_STATE, searchResult);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    }),
  [FETCH_SEARCH_SUGGESTIONS]: (context, listOptions) =>
    new Promise((resolve, reject) => {
      productApi
        .getSearchSuggestions(listOptions.query, listOptions.pagesize)
        .then((searchResult) => {
          resolve(searchResult);
        })
        .catch((error) => {
          reject();
          throw error;
        });
    }),
  [FETCH_PRODUCT_DETAIL]: (context, id) =>
    new Promise((resolve, reject) => {
      productApi
        .getProductDetail(id)
        .then((data) => {
          context.commit(UPDATE_PRODUCT_STATE, data);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    }),
  [FETCH_GLOBAL_INVENTORY]: (context, options) =>
    new Promise((resolve, reject) => {
      productApi
        .getGlobalInventory(options.id, options.type, options.qty)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject();
          throw error;
        });
    }),
  [FETCH_LASTVIEWED_ITEMS]: (context, options) =>
    new Promise((resolve, reject) => {
      productApi
        .getLastViewedItems(options.productIdList, options.curentProductId)
        .then((data) => {
          context.commit(UPDATE_LASTVIEWED_ITEMS_STATE, data);
          resolve(data);
        })
        .catch((error) => {
          reject();
          throw error;
        });
    }),

  [ADD_PRODUCT_TO_BASKET]: (context, payload) => {
    const productModel = payload;
    const product = payload.ProductModel.Product;
    const quantity = payload.ProductModel.Quantity.Current;
    if (productModel.DeleveryDate === null || payload.DeleveryDate === undefined) {
      productModel.DeleveryDate = new Date().toLocaleDateString("en-US");
    }
    return new Promise((resolve, reject) => {
      basketApi
        .addProductTobasket(product, quantity, payload.DeleveryDate, payload.ProductType)
        .then(() => {
          context.dispatch("basket/FETCH_CURRENT_BASKET", null, { root: true });
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    });
  }
};
