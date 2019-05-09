<template>
  <div class="uploadStatusPpContainer">
    <div class="modal-header popUpHeader">
      <h4 class="modal-title">Upload status</h4>
      <!-- closebutton-->
    </div>
    <div class="modal-body">
      <div class="table-basket table-table popUpTable uploadStatusPP">
        <div class="table-body">
          <div class="table-row table-header">
            <div class="divTh">Item</div>
            <div class="divTh">Item Name</div>
            <div class="divTh">Quantity</div>
            <div class="divTh">Message</div>
            <div class="divTh">Type</div>
          </div>
        </div>
        <div class="table-body table-content-body">
          <multi-product
            v-for="(item,index) in ProductList"
            :key="index"
            v-bind:ProductModel="item"
            v-on:onProductRedytoCart="PreparePproductToCart"
          ></multi-product>
        </div>
      </div>
      <div class="errorBlockPP">
        <div class="pPLeftBlock">
          <!--  <img class="iconWarn" src="@/assets/close-red.svg"> -->
          <img class="iconWarn">
        </div>
        <div class="pPRightBlock">
          <p
            class="font-weight-bold"
          >Following product(s) cannot be ordered since they are not available:</p>
          <p
            class="textColorGrey"
          >0734.309:390:000, 0734.309:390:000, 0734.309:390:000, 0734.309:390:000</p>
        </div>
      </div>
      <div class="btnBlock">
        <button class="zfbtn secondryBtnList" type="button" data-toggle="dropdown">Cancel</button>

        <button
          class="zfbtn secondryCartBtnI"
          type="button"
          data-toggle="dropdown"
          v-on:click="onAddToBasket"
        >Add to Basket</button>
      </div>
    </div>
  </div>
</template>
<script>
import MultiProductLine from "./MultiProductLine.vue";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "MultiSearch",
  components: {
    "multi-product": MultiProductLine
  },
  props: {
    ProductList: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      ProductListToBasket: []
    };
  },

  methods: {
    ...mapActions("products", {
      addtobasket: "addProductToBasket"
    }),

    PreparePproductToCart: function(productModel, type = "") {
      if (this.ProductListToBasket) {
        console.log("ProductListToBasket", this.ProductListToBasket);
        let item = this.ProductListToBasket.find(
          item => item.ProductModel.Product.Id == productModel.Product.Id
        );
        if (item) {
          item.ProductModel = productModel;
          item.Type = type;
        } else
          this.ProductListToBasket.push({
            ProductModel: productModel,
            Type: ""
          });
        console.log("ProductListToBasket2", this.ProductListToBasket);
      }
    },
    ClearInputs: function() {
      this.ProductListToBasket = [];
      // alert("clear data");
    },

    onAddToBasket: function() {
      this.ProductListToBasket.forEach(item => {
        console.log("add tot basket", item);
        this.addtobasket({
          ProductModel: item.ProductModel,
          DeleveryDate: null,
          ProductType: item.Type
        });
      });
    }
  }
};
</script>

