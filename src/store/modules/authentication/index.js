import actions from "./authentication.actions";
import getters from "./authentication.getters";
import mutations from "./authentication.mutations";

export default {
  namespaced: true,
  state: { Token: {} },
  actions,
  getters,
  mutations
};
