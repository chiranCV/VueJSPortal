<template>
  <div class="row mb-3">
    <div class="col-5 ioo-pr-10">
      <img class="drop-down-img" alt="108 * 78" src="@/assets/sm-thumb-img.jpg">
    </div>
    <div class="col-7 ioo-pl-10">
      <router-link v-bind:to="{ name: 'Detail', params: { id: productLine.Id }}">
        <p v-text="productLine.Title">Brake Disc</p>
      </router-link>
      <div class="colorBlackLight smFont">{{productLine.Id}} ({{productTypeText}})</div>
      <div
        class="font-weight-bold smFont ioo-mt-10"
      >{{salesLine.Quantity}} {{salesLine.UnitOfMeasureDescription}}</div>
    </div>
  </div>
</template>
<script>
import ProductLineHelper from "../../helpers/product-line-helper";

export default {
  name: "MiniBasketLine",
  props: {
    BasketLineModel: {
      type: Object,
      required: true
    }
  },
  computed: {
    productLine() {
      return this.BasketLineModel.Product;
    },
    salesLine() {
      return this.BasketLineModel.SalesLine;
    },
    quantityModel() {
      return this.BasketLineModel.QuantityModel;
    },
    productTypeText() {
      const product = this.productLine;
      if (product) {
        return ProductLineHelper.GetProductTypeValue(product).Title;
      }

      return "";
    }
  }
};
</script>
