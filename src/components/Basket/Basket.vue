
<template>
  <div>
    <div class="table-basket table-table" v-if="(BasketLines && BasketLines.length>0)">
      <div class="table-body">
        <div class="table-row table-header">
          <div>#</div>
          <div>Item</div>
          <div>Cross Reference Cust. Info</div>

          <div class="text-right">Gross Price Unit Price</div>
          <div class="text-right">NCM</div>
          <div>Origin of Material</div>

          <div class="text-right">IPI</div>
          <div class="text-right">Req. Shipment date</div>
          <div class="text-center">Quantity</div>
        </div>
      </div>
      <div class="table-body" v-for="(basketLine,index) in BasketLines" :key="index">
        <basket-line v-bind:BasketLineData="basketLine" v-on:OnUpdateBaasketLine="handleUpdateLine"></basket-line>
      </div>
    </div>
    <div v-else>
      <span>No products in basket</span>
    </div>
    <div class="dottedBorderBlock margin-bottom-20">
      <span></span>
    </div>
    <h3 class="margin-top-20 margin-bottom-20">Add more items</h3>
    <div class="margin-bottom-20">Upload parts list</div>
    <div class="upload-files-box text-center">
      <div class="row justify-content-md-center">
        <div class="col-md-8">
          <p>
            <img class="img-fluid" src="@/assets/upload.svg">
          </p>
          <span>
            <a href="#">Select files</a> for your parts list or use drag and drop.
          </span>
          <span>
            Only one file at a time: CSV, TXT, XLS, XLSX (Find upload template
            <a href>here</a>)
          </span>
        </div>
      </div>
    </div>
    <div class></div>

    <div class="row">
      <div class="col-md-12">
        <div class="cusInfoBlock float-none">
          <strong>Search for more parts</strong>
          <img class="iconWarn" src="@/assets/icon-warning.png">
        </div>
        <sana-searchbox v-bind:ButtonText="'Search'" v-on:onSearch="handleSearch"></sana-searchbox>
        <span v-if="IsProductSearching">Searching....</span>
        <sana-modelpopup ref="modalproductSearch" v-on:onPopupColse="handlePopupClose">
          <multi-productList
            ref="multilinelist"
            v-if="(SearchResultProductList)"
            v-bind:ProductList="SearchResultProductList"
          ></multi-productList>
        </sana-modelpopup>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import $ from "jquery";

import SearchBox from "../Shared/UIHelpers/SearchBox.vue";
import BasketLine from "./BasketLines.vue";
import ModelPopup from "../Shared/UIHelpers/ModelPopup.vue";

import MultiProduct from "./MultiProductSearchList.vue";
import Printd from "printd";

export default {
  name: "basket",
  components: {
    "sana-searchbox": SearchBox,
    "basket-line": BasketLine,
    "sana-modelpopup": ModelPopup,
    "multi-productList": MultiProduct
  },
  /* props:{
    RecalcualteBasket:{
      type:Function
    }
  }, */
  data() {
    return {
      AvailableProducts: [],
      IsProductSearching: false
    };
  },

  mounted() {
    /*    console.log();
    console.log("when component is mounted!");

    const p = new Printd();
    p.print(this.$el, ".span-row  { color: red; }");
    const { contentWindow } = this.d.getIFrame();

    contentWindow.addEventListener("beforeprint", () =>
      console.log("before print event!")
    );
    contentWindow.addEventListener("afterprint", () =>
      console.log("after print event!")
    ); */
  },

  methods: {
    ...mapActions("basket", {
      UpdateBasketLine: "updateBasketLine",
      SaveUpdatedBasketLines: "SaveUpdatedBasketLines",
      EmptyBasket: "emptyBasketLines"
    }),

    ...mapActions("products", {
      SearchProduct: "fetchSearchResult"
    }),

    handleSearch: function(searchkey) {
      this.IsProductSearching = true;
      let searchOptions = { query: "1", pagesize: 10 };
      if (searchkey && searchkey != "") {
        searchOptions.query = searchkey;
      }
      this.SearchProduct(searchOptions).then(() => {
        this.IsProductSearching = false;
        console.log(this.SearchResultProductList);
        let element = this.$refs.modalproductSearch.$el;
        $(element).modal("show");
      });
    },

    handleUpdateLine: function(lineModel) {
      this.UpdateBasketLine(lineModel);
    },

    RecalcualteBasket: function(globlaDeleveryDate) {
      console.log("basket to update", this.BasketModel);
      this.SaveUpdatedBasketLines({
        BasketModel: this.BasketModel,
        DeleveryDate: globlaDeleveryDate
      });
    },

    ClearBasketLines: function() {
      this.EmptyBasket();
    },

    handlePopupClose: function() {
      this.$refs.multilinelist.ClearInputs();
      //ClearInputs
    }
  },

  computed: {
    ...mapGetters("basket", {
      BasketCount: "getBasketCount",
      CurrentBasket: "getCurrentBasket",
      BasketLines: "getBasketLines",
      BasketModel: "getCurrentBasketModel"
    }),
    ...mapState("products", {
      ProductSearchState: state => state.ProductList.ListItems
    }),

    SearchResultProductList: function() {
      if (this.ProductSearchState) {
        return this.ProductSearchState.map(a => a.ProductModel);
      }
      return [];
    }
  }
};
</script>



