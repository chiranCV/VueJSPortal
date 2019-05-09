<template>
  <div class="row searchListContainer" v-show="ProductData">
    <ul>
      <li>
        <div class="listAvatarBlock">
          <img class="img-fluid" src="@/assets/md-thumb-img.jpg">
        </div>
      </li>
      <li>
        <h6>{{this.ProductData.Title}}</h6>
        <span>{{this.ProductData.Id}}</span>
        <span class="listDropDownText">
          <sana-dropdown
            v-bind:DataList="ProductModel.ProductType"
            v-bind:PreSelecteditem="getProductypeforProduct(ProductData)"
            v-bind:IdField="'Id'"
            v-bind:TextField="'Title'"
            v-on:onChangeSelection="handleTypeSelection($event)"
          ></sana-dropdown>
        </span>
        <div v-if="(CrossReffereceNumbers!='')">
          <span>Cross Reference: {{this.CrossReffereceNumbers}}</span>
        </div>
      </li>
      <li class="listThirdBlock">
        <ul>
          <li class="vCenterBlock">
            <!--  <span class="textGreen">In stock</span> -->
            <sana-stockindicator v-bind:StockModel="ProductModel.Stock"></sana-stockindicator>
          </li>
          <li class="vCenterBtnBlock">
            <!-- <button class="zfbtn checkInvBtn" type="button">Check Inventory</button> -->
            <inventorycheck-popup
              v-bind:ProductId="ProductData.Id"
              v-bind:ProductType="selectedproductType"
              v-bind:Qty="parseInt(ProductModel.Quantity.Current?ProductModel.Quantity.Current:0, 10)"
            ></inventorycheck-popup>
          </li>
          <li class="vCenterBlock">
            <span class="listPriceText">
              <!-- <div>&#8364; 584,40</div> -->
              <sana-price
                v-bind:Currency="'EUR'"
                v-bind:LanguageCode="'de-DE'"
                v-bind:Price="ProductPrices.NetPrice"
              ></sana-price>
            </span>
          </li>
          <li class="vCenterBtnBlock auroincrementInput">
            <!-- quantity box -->
            <sana-quantitybox
              v-bind:QuantityModel="ProductModel.Quantity"
              v-on:onQuantityChange="handleQuantityChange"
            ></sana-quantitybox>
          </li>
          <li class="vCenterBtnBlock">
            <button
              class="zfbtn secondryCartBtnI"
              type="button"
              v-on:click="onProductAddToBasket"
            >Add to basket</button>
          </li>
          <li class="vCenterBtnBlock">
            <div>
              <router-link :to="{ name: 'Detail', params: { id: this.ProductData.Id }}">
                <button class="zfbtn secondryBtnList" type="button">Detail</button>
              </router-link>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="modal fade"
      id="inventoryCheck"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <!--       <div class="modal-dialog" role="document">
      </div>-->
    </div>
  </div>
</template>
<script>
import Dropdown from "../Shared/UIHelpers/Dropdown.vue";
import productLineHelper from "../../Helpers/ProductLineHelper.js";
import StockIndicator from "../Shared/UIHelpers/StockIndicator.vue";
import QuantityBox from "../Shared/UIHelpers/QuantityBox.vue";
import InventoryCheck from "../Shared/InventoryCheck.vue";
import PriceLabel from "../Shared/UIHelpers/PriceLabel.vue";

export default {
  name: "ProductLine",
  components: {
    "sana-dropdown": Dropdown,
    "sana-stockindicator": StockIndicator,
    "sana-quantitybox": QuantityBox,
    "inventorycheck-popup": InventoryCheck,
    "sana-price": PriceLabel
  },
  props: {
    ProductModel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      //quantityquantity: 1,
      selectedproductType: {},
      showCrossrefNumbers: false
    };
  },

  created() {
    //console.log(this.ProductModel);
  },

  methods: {
    getProductypeforProduct: function(ProductData) {
      return productLineHelper.GetProductTypeValue(ProductData);
    },

    handleQuantityChange: function(qty) {
      if (this.ProductModel && qty && qty != null) {
        console.log("QTY", this.ProductModel.Quantity);
        this.ProductModel.Quantity.Current = qty;
      }
    },

    handleTypeSelection: function(producttype) {
      this.selectedproductType = producttype;
    },

    onProductAddToBasket: function() {
      this.$emit("onAddToCart", this.ProductModel, this.selectedproductType.Id);
    },

    onChekcInventoy: function() {
      // console.log("onChekcInventoy", this.ProductModel,this.selectedproductType.Id);
      this.$emit(
        "OnChekcInvetory",
        this.ProductModel.Product.Id,
        this.selectedproductType.Id,
        this.ProductModel.Quantity.Current
      );
    }

    /*   getSelectedroductType: function() {
      return this.selectedproductType.length !== 0
        ? this.selectedproductType
        : this.getProductypeforProduct(thie.ProductData);
    } */
  },

  computed: {
    ProductData: function() {
      return this.ProductModel ? this.ProductModel.Product : null;
      //return null;
    },

    CrossReffereceNumbers: function() {
      return productLineHelper.GetCrossRefereceNumbers(
        this.ProductModel.Product
      );
    },

    ProductType: function() {
      return "00";
    },

    ProductPrices: function() {
      if (this.ProductData) {
        return {
          Price: this.ProductData.Price,
          NetPrice: this.ProductData.NetPrice
        };
      }
      return { Price: 0, NetPrice: 0 };
    }
  }
};
</script>

