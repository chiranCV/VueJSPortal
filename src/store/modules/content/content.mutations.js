// Cotent Mutations.

import {
  UPDATE_SANATEXT_SATE,
  UPDATE_SITESETTINGS_SATE,
  UPDATE_DISABLEDATE_SATE,
  UPDATE_SITELANGUAGES_SATE
} from "../../mutation-types";

export default {
  // update sanatext state in vuex store.(storename: SanaTexts)
  [UPDATE_SANATEXT_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.SanaTexts = payload;
    }
  },
  // update site settings state in vuex store.(storename: SiteSettings)
  [UPDATE_SITESETTINGS_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.SiteSettings = payload.CommerceContext ? payload.CommerceContext.Settings : null;
      curentState.Shop = payload;
    }
  },

  // update disable dates state in vuex store.(storename: DisableDates)
  [UPDATE_DISABLEDATE_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.DisableDates = payload;
    }
  },

  // update shop language state in vuex store.(storename: ShopLanguages)
  [UPDATE_SITELANGUAGES_SATE]: (state, payload) => {
    const curentState = state;
    if (payload) {
      curentState.ShopLanguages = payload;
    }
  }
};
