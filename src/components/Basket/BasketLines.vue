<template>
  <!--   <div class="table-row" v-if="(BasketLineData.length >0)"> -->
  <div class="table-row" v-if="(BasketLineData)">
    <div>1</div>
    <div>
      <span class="span-row text-dark">
        <strong>{{Product.Id}}</strong>
      </span>
      <span class="span-row margin-top-10 margin-bottom-10">{{Product.Title}}</span>
      <span class="span-row margin-bottom-10">
        <!--  <select class="type-select" name id>
          <option value>Standard</option>
          <option value>Reman</option>
        </select>-->
        <sana-dropdown
          v-bind:DataList="PtoductTypes"
          v-bind:PreSelecteditem="PreSelectedProductype"
          v-bind:IdField="'Id'"
          v-bind:TextField="'Title'"
          v-on:onChangeSelection="handleTypeSelection($event)"
        ></sana-dropdown>
      </span>
      <div class="action-inks">
        <a href="#">View</a>
        <a href="#">Delete</a>
      </div>
    </div>
    <div>
      <span class="span-row">{{CrossRefereceNumbers}}</span>
      <textarea name class="basket-textarea" id cols="20" rows="8"></textarea>
    </div>
    <div>
      <span class="span-row text-right">€ 9,75</span>
      <span class="span-row text-right">€ 9,75</span>
    </div>
    <div class="text-right">92840384</div>
    <div>1</div>
    <div class="text-right">15%</div>
    <div class="tableDPContainer">
      <!-- <span class="span-row text-dark text-right">10/25/2018</span> -->
      <sana-datepickker
        v-bind:IsProgramaticOpen="false"
        v-bind:SelectedDate="new Date(Product.DeliveryDate)"
        v-on:onDateSelect="onDateChange"
      ></sana-datepickker>
    </div>
    <div class="tdQuantityBlock">
      <sana-quantitybox
        v-bind:QuantityModel="QuantityModel"
        v-on:onQuantityChange="handleQuantityChange"
      ></sana-quantitybox>
      <!--  <span class="uom-text span-row text-center">Pcs</span> -->
    </div>
  </div>
</template>
<script>
import productLineHelper from "../../Helpers/ProductLineHelper.js";
import Dropdown from "../Shared/UIHelpers/Dropdown.vue";
import QuantityBox from "../Shared/UIHelpers/QuantityBox.vue";
import Datepicker from "../Shared/UIHelpers/Date.vue";

export default {
  name: "BasketLines",
  components: {
    "sana-dropdown": Dropdown,
    "sana-quantitybox": QuantityBox,
    "sana-datepickker": Datepicker
    /*  "sana-stockindicator": StockIndicator,
    "sana-quantitybox": QuantityBox,
    "inventorycheck-popup": InventoryCheck */
  },
  props: {
    BasketLineData: {
      type: Object
    }
  },

  computed: {
    Product: function() {
      if (this && this.BasketLineData) {
        // console.log("salsesline", this.BasketLineData.Product);
        return this.BasketLineData.SalesLine;
        console.log(this.BasketLineData.SalesLine);
      } else {
        return {};
      }
    },

    CrossRefereceNumbers: function() {
      var crossreffnumbersvalues = "";
      if (this && this.BasketLineData && this.BasketLineData.Product) {
        var crossProducts = this.BasketLineData.Product.CrossReferenceProducts;
        if (crossProducts && crossProducts.length > 0) {
          crossProducts.forEach(function(item, i) {
            if (i === 0)
              crossreffnumbersvalues = item.CrossReferenceNo.toString();
            else {
              crossreffnumbersvalues = crossreffnumbersvalues.concat(
                ", ",
                item.CrossReferenceNo
              );
            }
          });
        }
      }
      return crossreffnumbersvalues;
    },

    PtoductTypes: function() {
      return productLineHelper.GetAllProductTypeValues();
    },

    PreSelectedProductype: function() {
      return productLineHelper.GetProductTypeValue(this.BasketLineData.Product);
    },

    QuantityModel: function() {
      return this.BasketLineData.QuantityModel;
    }
  },

  methods: {
    handleTypeSelection: function(producttype) {
      //this.selectedproductType = producttype;
      console.log("SelectedType", producttype);
    },

    handleQuantityChange: function(qty) {
      if (this.BasketLineData && qty && qty != null) {
        console.log("QTY", this.BasketLineData.QuantityModel);
        this.BasketLineData.QuantityModel.Current = qty;
      }
    },

    onDateChange: function(date) {
      if (this.BasketLineData && date && date != null) {
        this.Product.DeliveryDate = date;
      }
    }
  }
};
</script>

