<template>
  <div class="table-row" v-if="(ProductModel)">
    <div class="divTd">
      {{Product.Id}}
      <div class="clickableLink">Delete</div>
    </div>
    <div class="divTd">{{Product.Title}}</div>
    <div class="quantityBoxBlock divTd">
      <sana-quantitybox
        v-bind:QuantityModel="ProductModel.Quantity"
        v-on:onQuantityChange="handleQuantityChange"
      ></sana-quantitybox>
    </div>
    <div class="divTd">
      <span class="colorRed">Item unknown</span>
    </div>
    <div class="divTd">
      <sana-dropdown
        v-bind:DataList="ProductModel.ProductType"
        v-bind:PreSelecteditem="getProductypeforProduct(Product)"
        v-bind:IdField="'Id'"
        v-bind:TextField="'Title'"
        v-on:onChangeSelection="handleTypeSelection($event)"
      ></sana-dropdown>
    </div>
  </div>
</template>
<script>
import productLineHelper from "../../Helpers/ProductLineHelper.js";

import QuantityBox from "../Shared/UIHelpers/QuantityBox.vue";
import DropDown from "../Shared/UIHelpers/Dropdown.vue";

export default {
  name: "MultiProductLine",
  components: {
    "sana-quantitybox": QuantityBox,
    "sana-dropdown": DropDown
  },
  props: {
    ProductModel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectedProductType: {},
      quantity: 0,
      productToBasket: { Product: {}, Type: "0" }
    };
  },

  methods: {
    getProductypeforProduct: function(ProductData) {
      return productLineHelper.GetProductTypeValue(ProductData);
    },

    handleTypeSelection: function(selectedType) {
      //this.$emit("onProductRedytoCart", this.ProductModel, selectedType.Id);
      this.selectedProductType = selectedType;
      this.createProductTOBasketModel();
    },

    handleQuantityChange: function(qty) {
      if (this.ProductModel && qty && qty != null) {
        this.quantity = qty;
        this.createProductTOBasketModel();
      }
    },

    createProductTOBasketModel: function() {
      const productmodel = this.ProductModel;
      const type = this.selectedProductType ? this.selectedProductType.Id : "0";
      if (productmodel) {
        productmodel.Quantity.Current = this.quantity;
        this.$emit("onProductRedytoCart", productmodel, type);
      }
      this.$forceUpdate();
    }
  },

  computed: {
    Product: function() {
      return this.ProductModel ? this.ProductModel.Product : {};
    }
  }
};
</script>

