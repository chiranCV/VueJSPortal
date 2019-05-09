// content Actions.

import {
  FETCH_ALL_SANATEXT,
  FETCH_SITE_SETTINGS,
  FETCH_DISABLE_DATE,
  FETCH_SITE_LANGUAGES
} from "../../action-types";
import {
  UPDATE_SANATEXT_SATE,
  UPDATE_SITESETTINGS_SATE,
  UPDATE_DISABLEDATE_SATE,
  UPDATE_SITELANGUAGES_SATE
} from "../../mutation-types";
import contentApi from "../../../api/content-api";
import sesionManager from "../../../helpers/session-manager";
import config from "../../../config.json";

export default {
  // fetch sanatext reult
  // calling APi if cookie not exsist
  [FETCH_ALL_SANATEXT]: context =>
    new Promise((resolve, reject) => {
      if (!sesionManager.chekcCookieExsitst(config.Cookiekeys.SanaText)) {
        const timeout = config.CookieExpireTimes.SanaText;
        contentApi
          .getAllSanaText()
          .then((searchResult) => {
            context.commit(UPDATE_SANATEXT_SATE, searchResult);
            sesionManager.setCookie(config.Cookiekeys.SanaText, timeout, timeout);
            resolve();
          })
          .catch((error) => {
            reject();
            throw error;
          });
      }
    }),
  [FETCH_SITE_SETTINGS]: context =>
    new Promise((resolve, reject) => {
      // if (!sesionManager.chekcCookieExsitst(config.Cookiekeys.SanaText)) {
      contentApi
        .getSanaShopContext()
        .then((searchResult) => {
          context.commit(UPDATE_SITESETTINGS_SATE, searchResult);
          // sesionManager.setCookie(config.Cookiekeys.SanaText, 1);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
      // }
    }),

  [FETCH_DISABLE_DATE]: context =>
    new Promise((resolve, reject) => {
      if (!sesionManager.chekcCookieExsitst(config.Cookiekeys.DisableDates)) {
        const timeout = config.CookieExpireTimes.DisableDates;
        contentApi
          .getDesableDates()
          .then((disableDates) => {
            context.commit(UPDATE_DISABLEDATE_SATE, disableDates);
            sesionManager.setCookie(config.Cookiekeys.DisableDates, timeout, timeout);
            resolve();
          })
          .catch((error) => {
            reject();
            throw error;
          });
      }
    }),

  [FETCH_SITE_LANGUAGES]: context =>
    new Promise((resolve, reject) => {
      contentApi
        .getShopLanguages()
        .then((searchResult) => {
          context.commit(UPDATE_SITELANGUAGES_SATE, searchResult);
          resolve();
        })
        .catch((error) => {
          reject();
          throw error;
        });
    })
};
