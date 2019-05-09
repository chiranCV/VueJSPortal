import store from "../store";

class BasketHelper {
  // productModel: product Model
  // qty: quantity to add to cart
  // productType: string value of the product type
  // deliveryDate: date value
  static AddToCart = (productModel, qty, productType, deliveryDate) => {
    // check is orderable
    if (productModel && productModel.Product && parseInt(qty) !== "NaN") {
      if (productModel.Product.IsOrderable) {
        const quantity = parseInt(qty);
        // check order quantity is greater than the min quantity
        if (productModel.Quantity && quantity >= productModel.Quantity.Minimum) {
          // check order qty is a multiplication of step
          if (productModel.Quantity.Step > 0 && quantity % productModel.Quantity.Step === 0) {
            const model = productModel;
            model.Quantity.Current = quantity;
            store.dispatch("products/ADD_PRODUCT_TO_BASKET", {
              ProductModel: model,
              DeleveryDate: deliveryDate,
              ProductType: productType
            });
          }
        }
      }
    }
  };
}

export default BasketHelper;
