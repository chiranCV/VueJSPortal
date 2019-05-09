import _ from "lodash";
import store from "../store";
import config from "../config.json";
import cookieManager from "./session-manager";
import contentApi from "../api/content-api";
import AuthHelper from "./authentication-helper";
/* const contentApi = require("../api/content-api"); */

class GlobalHelper {
  static addNewProductToLastviewedIdList = (newItem) => {
    const cookieKey = config.Cookiekeys.LastViewdItems;
    let initiallist = [];
    if (cookieManager.chekcCookieExsitst(cookieKey)) {
      initiallist = cookieManager.getCookieJSON(cookieKey);
    }
    if (!_.find(initiallist, o =>
      o === newItem)) {
      initiallist.push(newItem);
    }
    cookieManager.setCookie(cookieKey, initiallist, config.CookieExpireTimes.LastViewdItems);
    let lastvieditemids = initiallist;
    if (lastvieditemids.length > config.MaxLastviewedToKeep) {
      lastvieditemids = initiallist.slice(0, config.MaxLastviewedToKeep);
    }
    return lastvieditemids;
  };

  static clearLastViewedItems = () => {
    const cookieKey = config.Cookiekeys.LastViewdItems;
    cookieManager.removeCookie(cookieKey);
  };

  static authenticateApi = () => {
    contentApi.authenticateApi();
  };

  static getCustomerSelectionBaseData(loadAll = true) {
    AuthHelper.requestApitoken().then(() => {
      store.dispatch("content/FETCH_SITE_SETTINGS");
      if (loadAll) store.dispatch("content/FETCH_ALL_SANATEXT");
      store.dispatch("basket/FETCH_CURRENT_BASKET");
      // fetchAllCurentAccount
      store.dispatch("customer/FETCH_ALL_CUSTOMER_ACCOUNT", "ajithonly");
      store.dispatch("content/FETCH_DISABLE_DATE");
      store.dispatch("content/FETCH_SITE_LANGUAGES");
    });
  }

  static authenticateApi = (Id) => {
    if (cookieManager.chekcCookieExsitst(config.Cookiekeys.ShopStatus)) {
      const shopStatus = cookieManager.getCookieJSON(config.Cookiekeys.ShopStatus);
      shopStatus[config.Cookiekeys.SelectedLanguageId] = Id;
      cookieManager.setCookie(config.Cookiekeys.ShopStatus, shopStatus, 60);
    }
  };

  static setLanguageId = (Id) => {
    if (cookieManager.chekcCookieExsitst(config.Cookiekeys.ShopStatus)) {
      const shopStatus = cookieManager.getCookieJSON(config.Cookiekeys.ShopStatus);
      shopStatus[config.Cookiekeys.SelectedLanguageId] = Id;
      cookieManager.setCookie(config.Cookiekeys.ShopStatus, shopStatus, 60);
    }
  };

  static getLanguageId() {
    if (cookieManager.chekcCookieExsitst(config.Cookiekeys.ShopStatus)) {
      const shopStatus = cookieManager.getCookieJSON(config.Cookiekeys.ShopStatus);
      return shopStatus[config.Cookiekeys.SelectedLanguageId];
    }
    return config.DEFAULT_SHOP_LANGUAGE;
  }

  static getShopLanguages() {
    const languages = store.getters["content/GET_SHOP_LANGUAGES"]();
    return languages;
  }
}

export default GlobalHelper;
