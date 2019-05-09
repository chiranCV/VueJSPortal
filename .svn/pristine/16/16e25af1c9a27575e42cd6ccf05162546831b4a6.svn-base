import store from "../store";

class SiteSettingsManager {
  static getAllSettings = () => {
    const sitesettings = store.getters["content/GET_SITE_SETTINGS"]();
    return sitesettings;
  };

  static getShopContext = () => {
    const context = store.getters["content/GET_SHOP_CONTEXT"]();
    return context;
  };

  static userHasAbilityTo = (key) => {
    const abilities = store.getters["content/GET_USER_ABILITIES"]();
    let ret = false;
    abilities.forEach((ability) => {
      if (ability.Key === key) {
        ret = ability.Value;
      }
    });
    return ret;
  };
}

export default SiteSettingsManager;
