import httpService from "../service/http-service";
import config from "../config.json";

class ProductApi {
  // get product search reult list forn Sana Api
  // (query:serach text, pageNo: page no, pageSize: page size)
  static getProductList = async (query, pageNo, pageSize, orderBy, asec = true) => {
    if (query === undefined || query === null || query === "") return [];
    const apiEndpoint = config.APIMethods.Product.Search;
    const PageNumber = pageNo > 0 ? pageNo : 1;
    const params = {
      searchQuery: query === "" ? "1" : query,
      page: PageNumber || 0,
      count: pageSize || 10
    };

    // set sort options to query string only if order by is available
    if (orderBy) {
      params.orderBy = orderBy;
      params.asec = asec;
    }

    try {
      const { data: products } = await httpService.get(apiEndpoint, {
        params
      });
      return products;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  // get product detail page data form Sna Api
  // (productId: product Id)
  static getProductDetail = async (productId) => {
    const apiEndpoint = config.APIMethods.Product.Details;
    const params = {
      id: productId
    };
    try {
      const { data: product } = await httpService.get(apiEndpoint, {
        params
      });
      return product;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  // get product search suggestions form Sana Api
  // (searchTerm: search key, productCount: max number of products in result)
  static getSearchSuggestions = async (searchTerm, productCount) => {
    const apiEndpoint = config.APIMethods.Product.SearchSuggesions;
    const params = {
      term: searchTerm,
      count: productCount
    };
    try {
      const { data: product } = await httpService.get(apiEndpoint, {
        params
      });
      return product;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  static getGlobalInventory = async (id, type, qty) => {
    const apiEndpoint = config.APIMethods.Product.GlobalInventory;
    const params = {
      prodId: id,
      prodType: type,
      qty
    };
    try {
      const { data: itemInventories } = await httpService.get(apiEndpoint, {
        params
      });
      return itemInventories;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  static getLastViewedItems = async (productIdList, curentProductId) => {
    const apiEndpoint = config.APIMethods.Product.LastViewdItems;
    const params = {
      lastViewedProductIdList: productIdList.join(","),
      itemCount: null,
      excludingProductId: curentProductId
    };
    try {
      const { data: lastVieweditems } = await httpService.get(apiEndpoint, {
        params
      });
      return lastVieweditems;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  /*  static async getSearchSuggestions(searchTerm, productCount) {
    const ApiMethod = config.APIMethods.Product.SearchSuggesions;
    try {
      const { data: suggessions } = await httpService.post(ApiMethod, {
        term: searchTerm,
        count: productCount
      });
      return suggessions;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
      throw ex;
    }
  } */
}
export default ProductApi;
