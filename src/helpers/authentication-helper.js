import store from "../store";
import sessionManager from "./session-manager";
import appConfig from "../config.json";

class AuthenticationHelper {
  static getNewToken = () =>
    new Promise((resolve, reject) => {
      store
        .dispatch("authentication/FETCH_AUTH_TOEKN", this.createHeaderOptions())
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    });

  static createShopStatusCookie = () => {
    const shopStatusObj = {
      ZFUserId: "ZF100",
      SupplierId: "ZFTBR",
      CustomerNo: "S105063",
      SAPCustomerNo: "S105063",
      MappedShopId: "SanaStore",
      SelectedLanguageId: appConfig.DEFAULT_SHOP_LANGUAGE
    };
    if (!sessionManager.chekcCookieExsitst(appConfig.Cookiekeys.ShopStatus)) {
      sessionManager.setCookie(appConfig.Cookiekeys.ShopStatus, shopStatusObj, 60);
    }
  };

  static createHeaderOptions = () =>
    ({ grantType: "password", userName: "ZF100" });

  static requestApitoken = () =>
    this.getNewToken().then(() => {
      const token = store.getters["authentication/GET_AUTH_TOKEN"];
      if (token) return Promise.resolve(token);
      return Promise.resolve({});
    });

  static getSelectedCustomerSuplier = () => {
    if (sessionManager.chekcCookieExsitst(appConfig.Cookiekeys.ShopStatus)) {
      return sessionManager.getCookieJSON(appConfig.Cookiekeys.ShopStatus);
    }
    return {};
  };
}

export default AuthenticationHelper;
