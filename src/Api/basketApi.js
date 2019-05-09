import httpService from "../Services/httpService";
import config from "../Config.json";

class BasketApi {
  static async getSanaText() {
    const ApiMethod = config.APIMethods.Common.SanaText;
    const params = {
      languageId: 1033,
    };
    try {
      /*  const { data: sanatext } = await httpService.get(ApiMethod, {
        params: params,
      }); */
      const { data: sanatext } = await httpService.get(ApiMethod);
      console.log("sanatext", sanatext);
      return sanatext;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("wrond page number");
    }
    /*  try {
      
      const { data: basket } = await httpService.get(ApiMethod);
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
    } */
  }

  /// Get Curent basket through Sana API
  static async getCurrentbasket() {
    const ApiMethod = config.APIMethods.Basket.CurrentBasket;
    try {
      const { data: basket } = await httpService.get(ApiMethod);
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
    }
  }

  /// Add Product to basket through Sana API
  static async addProductTobasket(Product, Quantity, Deleverydate, ProductType) {
    const ApiMethod = config.APIMethods.Basket.AddProductTobasket;
    try {
      const { data: basket } = await httpService.post(ApiMethod, {
        prodId: Product.Id,
        varId: "",
        qty: Quantity,
        uom: Product.UnitOfMeasureId,
        reqDeliveryDate: Deleverydate ? Deleverydate : "",
        prodType: ProductType,
      });
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
    }
  }

  /// Update basket through Sana API
  static async updatebasket(updatebasketModel) {
    console.log("UpdatedData", updatebasketModel);
    const ApiMethod = config.APIMethods.Basket.UpdateBasket;
    try {
      const { data: basket } = await httpService.post(ApiMethod, updatebasketModel);
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
    }
  }

  /// Clear basket through Sana API
  static async emptyBasket() {
    const ApiMethod = config.APIMethods.Basket.ClearBasket;
    try {
      const { data: basket } = await httpService.post(ApiMethod);
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
    }
  }
}

export default BasketApi;
