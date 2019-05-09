import httpService from "../Services/httpService";
import config from "../Config.json";

class ProductApi {
  // get product list form Snaa API
  static async getProductList(query, pageNo, pageSize) {
    const ApiMethod = config.APIMethods.Product.Search;
    const params = {
      searchQuery: query,
      page: pageNo ? pageNo : 0,
      count: pageSize ? pageSize : 10
    };
    try {
      const { data: products } = await httpService.get(ApiMethod, {
        params: params
      });
      return products;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("wrond page number");
    }
  }

  // get product details form Snaa API
  static async getProductDetail(productId) {
    const ApiMethod = config.APIMethods.Product.Details;
    const params = {
      id: productId
    };
    try {
      const { data: product } = await httpService.get(ApiMethod, {
        params: params
      });
      return product;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("wrond product id");
    }
  }

  // get global inventory information form Snaa API
  static async getGlobalInventory(productId, productType, qty) {
    const ApiMethod = config.APIMethods.Product.GlobalInventory;
    const params = {
      prodId: productId,
      prodType: productType,
      qty: qty
    };
    console.log(ApiMethod);
    try {
      const { data: inventory } = await httpService.get(ApiMethod, {
        params: params
      });
      return inventory;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("wrong product id");
    }
  }

  // get desable dates from  Snaa API
  static async getDesableDates() {
    const ApiMethod = config.APIMethods.Common.DisableDates;

    try {
      const { data: LastViewdItems } = await httpService.get(ApiMethod);
      return LastViewdItems;
    } catch (ex) {
      throw ex;
    }
  }

  static async getlastviewdProducts(productIdList, curentProductId) {
    const ApiMethod = config.APIMethods.Product.LastViewdItems;
    try {
      const { data: lastVieweditems } = await httpService.get(ApiMethod, {
        params: {
          lastViewedProductIdList: productIdList.join(","),
          itemCount: null,
          excludingProductId: curentProductId
        }
      });

      return lastVieweditems;
    } catch (ex) {
      throw ex;
    }
  }

  static async searchTemp(query, pageNo, pageSize) {
    const ApiMethod = config.APIMethods.Product.Search;
    const params = {
      searchQuery: query,
      page: pageNo ? pageNo : 1,
      count: pageSize ? pageSize : 10
    };
    try {
      const { data: products } = await httpService.get(ApiMethod, {
        params: params
      });
      return products;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) alert("wrond page number");
    }
  }
}

export default ProductApi;
