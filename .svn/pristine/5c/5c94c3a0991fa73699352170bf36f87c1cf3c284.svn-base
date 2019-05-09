<template>
  <div>
    <h3>Error!!!</h3>
    <span>Your session has Expired.Please reload the app from button below.</span>
    <br>
    <button class="ioo-btn ioo-btn-default back-btn" v-on:click="refreshPage">
      <span class="btn-inner">
        <span class></span>
        <span class="btn-text">Refresh Site</span>
      </span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { CLEAR_AUTH_TOKEN } from "../store/mutation-types";
import SesionManager from "../helpers/session-manager";
import appConfig from "../config.json";

export default {
  name: "ErrorPage",

  // local state.
  data() {
    return {};
  },

  // props for the compoment.
  props: {},

  // Life sycle hooks.
  created() {},

  mounted() {},
  methods: {
    ...mapMutations("authentication", {
      ClearAuthenticationToken: CLEAR_AUTH_TOKEN
    }),
    refreshPage() {
      // clear cookie, isValidPage
      SesionManager.removeCookie(appConfig.Cookiekeys.IsValidToken);
      // clear cookie, RefreshTokenRetryCount
      SesionManager.setCookie(appConfig.Cookiekeys.RefreshTokenRetryCount, 0);
      // clear refresh token value from store ?
      this.ClearAuthenticationToken();
      this.$router.push({ name: "Search" });
    }
  }
};
</script>
