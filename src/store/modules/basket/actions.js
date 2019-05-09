import BasketApi from "../../../Api/basketApi";
import productLineHelper from "../../../Helpers/ProductLineHelper";

const fetchSanaText = context => {
  return new Promise((resolve, reject) => {
    BasketApi.getSanaText()
      .then(sanatextdata => {
        context.commit("UPDATE_SANA_TEXT", sanatextdata);
        resolve();
      })
      .catch(error => {
        throw error;
      });
  });
};

const fetchCurretbasket = context => {
  return new Promise((resolve, reject) => {
    BasketApi.getCurrentbasket()
      .then(basketdata => {
        context.commit("UPDATE_BASKET_STATE", basketdata);
        resolve();
      })
      .catch(error => {
        throw error;
      });
  });
};

const updateBasketLine = (context, payload) => {
  console.log("Updateline action", payload);
  context.commit("UPDATE_BASKET_LINE", payload);
};

const SaveUpdatedBasketLines = (context, payload) => {
  const { BasketModel, DeleveryDate } = payload;
  console.log(payload);

  let updatedlines = productLineHelper.GetUpdatedLines(
    BasketModel.LinesModel.ProductLines,
    DeleveryDate ? DeleveryDate : null,
  );
  console.log(updatedlines);
  return new Promise((resolve, reject) => {
    BasketApi.updatebasket(updatedlines)
      .then(basketdata => {
        context.dispatch("fetchCurretbasket");
        resolve();
      })
      .catch(error => {
        throw error;
      });
  });
};

const emptyBasketLines = context => {
  return new Promise((resolve, reject) => {
    BasketApi.emptyBasket()
      .then(basketdata => {
        context.commit("UPDATE_BASKET_STATE", basketdata);
        resolve();
      })
      .catch(error => {
        throw error;
      });
  });
};

export default {
  fetchCurretbasket,
  fetchSanaText,
  updateBasketLine,
  SaveUpdatedBasketLines,
  emptyBasketLines,
};
