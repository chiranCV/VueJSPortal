<template>
  <div>
    <div v-if="!IsLoading">
      <ioo-header></ioo-header>
      <div class="row pDetailTopContainer">
        <div class="col-md-5 pDetailTLeftBlock">
          <img class="img-fluid" alt="Vue logo" src="@/assets/lg-thumb-img.jpg">
        </div>
        <div class="col-md-7 pDetailTRightBlock">
          <h4>{{Product.Title}}</h4>
          <p>
            <label>Item No.</label>
            {{Product.Id}}
          </p>
          <span>Net weight: {{Product.Weight}} lbs | Gross weight: {{Product.ProductGrossWeight}} lbs</span>
          <div class="detailPFormBlock">
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Requested delivery date:</label>
              <div class="col-sm-8 dDPContainer">
                <sana-datepickker
                  v-bind:IsProgramaticOpen="false"
                  v-on:onDateSelect="handleDateSelection"
                ></sana-datepickker>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Quantity:</label>
              <div class="col-sm-8">
                <div class="disflexContainer">
                  <div class="detailPQuantityBoxBlock">
                    <!--  <input
                      type="number"
                      name="quantity"
                      v-bind:min="Min"
                      v-bind:max="Max"
                      v-bind:step="Step"
                      v-bind:value="QuantityValue"
                      v-on:input="updateValue($event.target.value)"
                    >-->
                    <sana-quantitybox
                      v-bind:QuantityModel="DetailModel.Quantity"
                      v-on:onQuantityChange="handleQuantityChange"
                    ></sana-quantitybox>
                  </div>
                  <div class="detailPDropDownBlock">
                    <span class="listDropDownText">
                      <sana-dropdown
                        v-bind:DataList="DetailModel.ProductType"
                        v-bind:PreSelecteditem="getProductypeforProduct()"
                        v-bind:IdField="'Id'"
                        v-bind:TextField="'Title'"
                        v-on:onChangeSelection="handleTypeSelection($event)"
                      ></sana-dropdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Price:</label>
              <div class="col-sm-8">
                <div class="disflexContainer">
                  <div class="detailPriceBlock">
                    <p class="detailPriceText">
                      <!-- Product.NetPrice -->
                      <sana-price
                        v-bind:Currency="'EUR'"
                        v-bind:LanguageCode="'de-DE'"
                        v-bind:Price="Product.NetPrice"
                      ></sana-price>
                      <span>price per Piece excl, tax</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row detailActionBtnBlock">
              <div class="col-sm-4">
                <!-- <button class="zfbtn secondryBtnSearchI" type="button">Check Inventory</button> -->
                <inventorycheck-popup
                  v-bind:ProductId="Product.Id"
                  v-bind:ProductType="{}"
                  v-bind:Qty="parseInt(DetailModel.Quantity.Current?DetailModel.Quantity.Current:0, 10)"
                  v-bind:RoundButton="true"
                ></inventorycheck-popup>
              </div>
              <div class="col-sm-4">
                <button
                  class="zfbtn secondryCartBtnI"
                  type="button"
                  v-on:click="onProductAddToBasket"
                >Add to basket</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="dottedBorderBlock">
          <span></span>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import productLineHelper from "../../Helpers/ProductLineHelper.js";

import Header from "../../components/Shared/header.vue";
import QuantityBox from "../Shared/UIHelpers/QuantityBox.vue";
import Dropdown from "../Shared/UIHelpers/Dropdown.vue";
import Datepicker from "../Shared/UIHelpers/Date.vue";
import PriceLabel from "../Shared/UIHelpers/PriceLabel.vue";
import InventoryCheck from "../Shared/InventoryCheck.vue";

export default {
  name: "Details",
  components: {
    "ioo-header": Header,
    "sana-quantitybox": QuantityBox,
    "sana-dropdown": Dropdown,
    "sana-datepickker": Datepicker,
    "sana-price": PriceLabel,
    "inventorycheck-popup": InventoryCheck
  },

  data() {
    return {
      Product: {},
      DetailModel: {},
      IsLoading: false,
      selectedProductType: {}
    };
  },

  created() {
    var productId = this.$route.params.id;
    // console.log("productId", productId);
    this.IsLoading = true;
    this.fetchproduct(productId).then(() => {
      this.IsLoading = false;
      this.Product = this.productDetail;
      this.DetailModel = this.productDetailModel;
    });
  },

  methods: {
    ...mapActions("products", {
      fetchproduct: "fetchProduct",
      addtobasket: "addProductToBasket"
    }),

    getProductypeforProduct: function() {
      console.log(this.productDetail);
      return productLineHelper.GetProductTypeValue(this.productDetail);
    },

    handleQuantityChange: function(qty) {
      if (this.DetailModel && qty && qty != null) {
        console.log("QTY", this.DetailModel.Quantity);
        this.DetailModel.Quantity.Current = qty;
      }
    },

    onProductAddToBasket: function() {
      console.log("detail model", this.DetailModel);
      let prodType = this.selectedProductType ? this.selectedProductType.Id : 0;
      this.addtobasket({
        ProductModel: this.DetailModel,
        DeleveryDate: null,
        ProductType: prodType
      });
    },

    handleTypeSelection: function(selectedType) {
      this.selectedProductType = selectedType;
    },

    handleDateSelection: function(selctedDate) {
      console.log(selctedDate);
    }
  },

  computed: {
    ...mapState("products", {
      productDetailModel: state => state.product
    }),

    ...mapGetters("products", {
      productDetail: "getproduct"
    }),

    dummyData: function() {
      return undefined;
    }
  }
};
</script>
