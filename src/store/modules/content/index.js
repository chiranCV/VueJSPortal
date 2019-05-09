import actions from "./content.actions";
import getters from "./content.getters";
import mutations from "./content.mutations";

export default {
  namespaced: true,
  state: {
    SanaTexts: [],
    SiteSettings: Object,
    Shop: Object,
    DisableDates: [],
    ShopLanguages: []
  },
  actions,
  getters,
  mutations
};
