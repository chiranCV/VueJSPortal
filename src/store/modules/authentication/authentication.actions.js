// API Authentication Actions.

import { FETCH_AUTH_TOEKN } from "../../action-types";
import { SAVE_AUTH_TOKEN_SATE } from "../../mutation-types";
import authApi from "../../../api/authentication-api";
import sesionManager from "../../../helpers/session-manager";
import appConfig from "../../../config.json";
import router from "../../../router";

export default {
  // fetch current basket result
  [FETCH_AUTH_TOEKN]: (context, HeaderOptions) =>
    new Promise((resolve, reject) => {
      const headerOptions = HeaderOptions;
      // isValidToken does not exist, means cookie has expeired
      if (!sesionManager.chekcCookieExsitst(appConfig.Cookiekeys.IsValidToken)) {
        // if cookie has expired, request the new token from refresh_token
        const authToken = context.getters.GET_AUTH_TOKEN;
        if (authToken && authToken.refresh_token) {
          headerOptions.grantType = "refresh_token";
          headerOptions.refresh_token = authToken.refresh_token;
        }
        let tokenCount = 0;
        if (sesionManager.chekcCookieExsitst(appConfig.Cookiekeys.RefreshTokenRetryCount)) {
          const count = sesionManager.getCookie(appConfig.Cookiekeys.RefreshTokenRetryCount);
          try {
            tokenCount = parseInt(count, 10);
          } catch (parseError) {
            tokenCount = 0;
          }
        }

        authApi
          .getToken(headerOptions)
          .then((token) => {
            context.commit(SAVE_AUTH_TOKEN_SATE, token);
            sesionManager.setCookie(
              appConfig.Cookiekeys.IsValidToken,
              true,
              token.expires_in / 60 - 2
            );
            sesionManager.setCookie(appConfig.Cookiekeys.RefreshTokenRetryCount, 0);
            resolve();
          })
          .catch((error) => {
            // on error, clear the value of refreshToken from state
            if (tokenCount >= 3) {
              router.push({
                name: "Error",
                query: { code: 99 }
              });
            }
            sesionManager.setCookie(appConfig.Cookiekeys.RefreshTokenRetryCount, tokenCount + 1);
            debugger;
            router.go();
            reject();
            throw error;
          });
      } else {
        resolve();
      }
    })
};
