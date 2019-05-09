import ProductsApi from "../../Api/productApi";
import BasketApi from "./../../Api/basketApi";
import ProductApi from "../../Api/productApi";

export default {
  namespaced: true,
  state: { ProductList: {}, product: {}, glabalInventory: {} },

  mutations: {
    updateProductList: function(state, payload) {
      if (payload && payload.ListItems) {
        state.ProductList = payload;
      }
    },

    updateProductDetail: function(state, payload) {
      if (payload) {
        state.product = payload.ProductModel;
      }
    },

    updateGlobalInvetory: function(state, payload) {
      if (payload) {
        state.glabalInventory = payload;
        console.log(state.glabalInventory);
      }
    }
  },

  getters: {
    getproductListItems: function(state) {
      if (state.ProductList.ListItems) return state.ProductList.ListItems;
      else {
        return [];
      }
    },

    SearchResulthadder: function(state) {
      if (state.ProductList.Loading) return state.ProductList.Loading;
      else {
        return [];
      }
    },

    getproduct: function(state) {
      if (state.product && state.product) return state.product.Product;
      else {
        return {};
      }
    },

    getGlobalInventory: function(state) {
      if (state.glabalInventory) return state.glabalInventory;
      else {
        return {};
      }
    },

    getGlobalInventryHeader: function(state) {
      if (
        state.glabalInventory.ItemInventories &&
        state.glabalInventory.ItemInventories.length > 0
      ) {
        var itemno = state.glabalInventory.ItemInventories[0].ItemNo;
        var title = state.glabalInventory.ItemInventories[0].Title;
        return { ItemNo: itemno ? itemno : "1", Title: title ? title : "1" };
      } else {
        return {};
      }
    },

    getGlobalInventoryItemSuppliers: function(state) {
      console.log(state);
      if (
        state.glabalInventory.ItemInventories &&
        state.glabalInventory.ItemInventories.length > 0
      ) {
        return state.glabalInventory.ItemInventories[0].ItemSuppliers;
      } else {
        return [];
      }
    }
  },

  actions: {
    fetchSearchResult: function(context, listOptions) {
      return new Promise((resolve, reject) => {
        ProductsApi.getProductList(listOptions.query, 1, listOptions.pagesize)
          .then(searchResult => {
            context.commit("updateProductList", searchResult);
            resolve();
          })
          .catch(error => {
            throw error;
          });
      });
    },

    addProductToBasket: function(context, payload) {
      var product = payload.ProductModel.Product;
      //console.log(producttype);
      let quantity = payload.ProductModel.Quantity.Current;
      if (payload.DeleveryDate === null || payload.DeleveryDate === undefined) {
        payload.DeleveryDate = new Date().toLocaleDateString("en-US");
      }
      return new Promise((resolve, reject) => {
        BasketApi.addProductTobasket(
          product,
          quantity,
          payload.DeleveryDate,
          payload.ProductType
        ).then(basketdata => {
          context.dispatch("basket/fetchCurretbasket", null, { root: true });
        });
      });
    },

    fetchProduct: function(context, product_id) {
      return new Promise((resolve, reject) => {
        ProductsApi.getProductDetail(product_id)
          .then(product => {
            context.commit("updateProductDetail", product);
            resolve();
          })
          .catch(error => {
            reject();
            throw error;
          });
      });
    },

    fetchProducGlobalInventory: function(context, payload) {
      var product_id = payload.ProductId;
      var product_type = payload.ProductType ? payload.ProductType : "";
      var product_qty = payload.Qty ? payload.Qty : 0;

      return new Promise((resolve, reject) => {
        ProductApi.getGlobalInventory(product_id, product_type, product_qty)
          .then(invetory => {
            context.commit("updateGlobalInvetory", invetory);
            resolve();
          })
          .catch(error => {
            reject();
            throw error;
          });
      });
    }
  }
};
