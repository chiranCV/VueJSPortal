import httpService from "../service/http-service";
import config from "../config.json";

class BasketApi {
  // get all SanaTexts Sana Api
  static getCurrentbasket = async () => {
    const apiEndpoint = config.APIMethods.Basket.CurrentBasket;
    try {
      const { data: basket } = await httpService.get(apiEndpoint);
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
      throw ex;
    }
  };

  // add products to basket ()
  static addProductTobasket = async (Product, Quantity, Deleverydate, ProductType) => {
    const ApiMethod = config.APIMethods.Basket.AddProductTobasket;
    try {
      const { data: basket } = await httpService.post(ApiMethod, {
        prodId: Product.Id,
        varId: "",
        qty: Quantity,
        uom: Product.UnitOfMeasureId,
        reqDeliveryDate: Deleverydate || "",
        prodType: ProductType
      });
      return basket;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
      throw ex;
    }
  };
}

export default BasketApi;
