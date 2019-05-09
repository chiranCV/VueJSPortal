import BasketApi from "../../Api/basketApi";

export default {
  namespaced: true,
  state: { basket: {} },
  mutations: {
    updatebasketState: function(state, payload) {
      if (payload && payload) {
        state.basket = payload;
      }
    }
  },

  getters: {
    getBasketCount: function(state) {
      if (state.basket) {
        return state.basket.TotalCount;
      } else {
        return 0;
      }
    },
    getBasketLines: function(state) {
      console.log("getBasketLines", state);
      if (state.basket && state.basket.LinesModel) {
        return state.basket.LinesModel.ProductLines;
      } else {
        return [];
      }
    },
    getCurrentBasketModel: function(state) {
      if (state.basket) {
        console.log(state.basket);
        return state.basket;
      } else {
        return {};
      }
    },
    getCurrentBasket: function(state) {
      if (state.basket) {
        console.log(state.basket);
        return state.basket.Basket;
      } else {
        return {};
      }
    }
  },

  actions: {
    fetchCurretbasket: function(context) {
      console.log("call basket get");
      BasketApi.getCurrentbasket()
        .then(basketdata => {
          context.commit("updatebasketState", basketdata);
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
