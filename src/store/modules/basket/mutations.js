const UPDATE_SANA_TEXT = (state, payload) => {
  if (payload) {
    console.log("UPDATE_SANA_TEXT", payload);
    state.sanatext = payload;
  }
};

const UPDATE_BASKET_STATE = (state, payload) => {
  if (payload) {
    console.log("UPDATE_BASKET_STATE", payload);
    state.basket = payload;
  }
};

const UPDATE_BASKET_LINE = (state, payload) => {
  if (payload) {
    console.log("UPDATE_BASKET_LINE", payload);
    console.log("State", state);
    if (state.basket !== {}) {
      let lines = state.basket.LinesModel.ProductLines.map(function(item) {
        if (item.SalesLine.ProductId === payload.ProductId) {
          item.SalesLine.Quantity = payload.SalesLine.Quantity;
          item.SalesLine.DeliveryDate = payload.SalesLine.DeliveryDate;
          item.SalesLine.InforComment = payload.SalesLine.InforComment;

          item.Product.Standard = payload.Product.Standard;
          item.Product.New = payload.Product.New;
          item.Product.RemanWith = payload.Product.RemanWith;
          item.Product.RemanWithout = payload.Product.RemanWithout;
          item.IsChange = true;
          return item;
        }
        return item;
      });

      console.log("UpdatedLines", lines);
      var x = {
        ...state,
        basket: {
          ...state.basket,
          LinesModel: {
            ...state.basket.LinesModel,
            ProductLines: lines,
          },
        },
      };
      /* state.basket = {
        ...state,
        basket
      }; */

      /*     state.basket = {
        ...state,
        basket: {
          ...state.basket,
          LinesModel: {
            ...state.basket.LinesModel,
            ProductLines: lines
          }
        }
      }; */

      console.log("State afterUpdate", x);
    }
  }
};

export default {
  UPDATE_BASKET_STATE,
  UPDATE_BASKET_LINE,
  UPDATE_SANA_TEXT,
};
