// Contetnt Getters.

import {
  GET_SANA_TEXT,
  GET_SITE_SETTINGS,
  GET_USER_ABILITIES,
  GET_SHOP_CONTEXT,
  GET_SHOP_LANGUAGES
} from "../../getter-types";

export default {
  // get sana text by key (key: sanatext key).
  // return : array of product list items
  [GET_SANA_TEXT]: state =>
    (key) => {
      if (state.SanaTexts) {
        return state.SanaTexts.find(s =>
          s.Key === key);
      }
      return {};
    },
  // get all site settings
  // return : site settings object
  [GET_SITE_SETTINGS]: state =>
    () => {
      if (state.SiteSettings) {
        return state.SiteSettings;
      }
      return {};
    },
  [GET_USER_ABILITIES]: state =>
    () => {
      if (state.Shop) {
        return state.Shop.UserAbilities.$values;
      }
      return {};
    },
  [GET_SHOP_CONTEXT]: state =>
    () => {
      if (state.Shop) {
        return state.Shop;
      }
      return {};
    },
  [GET_SHOP_LANGUAGES]: state =>
    () => {
      if (state.ShopLanguages) {
        return state.ShopLanguages;
      }
      return {};
    }
};
