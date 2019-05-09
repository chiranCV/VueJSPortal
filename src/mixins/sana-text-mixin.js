// Mixin for get Sana text

import $ from "jquery";
import SanaTextManager from "../helpers/sana-text-manager";
import SiteSettingsManager from "../helpers/site-settings-manager";

export default {
  data() {
    return {
      ShopContext: SiteSettingsManager.getShopContext()
    };
  },
  methods: {
    UserHasAbilityTo(abilityName) {
      return SiteSettingsManager.userHasAbilityTo(abilityName);
    },
    GetSanaText(key, defult = "") {
      return SanaTextManager.getSanaText(key, defult);
    },
    ShowLoadingDialog(show = true) {
      // const el = $("#sanaLoadingDialog");
      const { state } = this.$store;
      state.isLoading = show;
    }
  }
};
