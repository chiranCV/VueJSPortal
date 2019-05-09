import actions from "./basket.actions";
import getters from "./basket.getters";
import mutations from "./basket.mutations";

export default {
  namespaced: true,
  state: { Basket: {} },
  actions,
  getters,
  mutations
};
