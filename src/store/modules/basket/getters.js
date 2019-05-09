const getBasketCount = state => {
  if (state.basket) {
    return state.basket.TotalCount;
  } else {
    return 0;
  }
};

const getBasketLines = state => {
  if (state.basket && state.basket.LinesModel) {
    return state.basket.LinesModel.ProductLines;
  } else {
    return [];
  }
};

const getCurrentBasketModel = state => {
  if (state.basket) {
    return state.basket;
  } else {
    return {};
  }
};

const getCurrentBasket = state => {
  if (state.basket) {
    return state.basket.Basket;
  } else {
    return {};
  }
};

export default {
  getBasketCount,
  getBasketLines,
  getCurrentBasketModel,
  getCurrentBasket
};
