import Vue from "vue";
import Vuex from "vuex";
import PersistedState from "vuex-persistedstate";

import productsModule from "./modules/products";
import basketModule from "./modules/basket";
import contentModule from "./modules/content";
import customerModule from "./modules/customer";
import apiAuthModule from "./modules/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products: productsModule,
    basket: basketModule,
    content: contentModule,
    customer: customerModule,
    authentication: apiAuthModule
  },
  plugins: [
    PersistedState({
      paths: ["basket", "content", "authentication"]
    })
  ]
});
