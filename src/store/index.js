import Vue from "vue";
import Vuex from "vuex";
import productsModule from "./modules/products.js";
import basketModule from "./modules/basket/";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products: productsModule,
    basket: basketModule,
  },
  plugins: [
    createPersistedState({
      paths: ["basket"],
    }),
  ],
});
