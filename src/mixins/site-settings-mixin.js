// Mixin for get Sana text

import SiteSettingsManager from "../helpers/site-settings-manager";

export default {
  methods: {
    GetSiteSettings() {
      return SiteSettingsManager.getAllSettingsnaText();
    }
  }
};
