<template>
  <div class="shoppingBDBlock">
    <!--     <div>{{CurrentBasket}}</div> -->
    <h4>
      <strong>Shopping Basket Details</strong>
    </h4>
    <div class="row">
      <div class="col-md-8">
        <span>Items ({{BasketCount}} units)</span>
      </div>
      <div class="col-md-4 text-right">
        <span>€ {{BasketPrices.TotalPriceExcludingDiscount}}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <span>Subtotal</span>
      </div>
      <div class="col-md-4 text-right">
        <span>€ {{BasketPrices.TotalPriceExcludingVat}}</span>
      </div>
    </div>
    <div class="row margin-top-20">
      <div class="col-md-8">Total incl. VAT</div>
      <div class="col-md-4 text-right">€ {{BasketPrices.TotalPrice}}</div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <span class="text-dark">Total weight: {{Basketweights.TotalZfWeight}} lbs</span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <strong>
          <span class="text-dark">Total gross weight: {{Basketweights.TotalZfGrossWeight}} lbs</span>
        </strong>
      </div>
    </div>

    <div class="margin-top-20">
      <strong>Requested delivery date</strong>
    </div>
    <div class="row margin-top-20 dDPContainer">
      <div class="col-md-12">
        <sana-datepickker
          v-bind:IsProgramaticOpen="false"
          v-on:onDateSelect="onDateChange"
          v-bind:SelectedDate="GlobalDeleveryDate"
        ></sana-datepickker>
      </div>
    </div>
    <div class="row margin-top-20 margin-bottom-20">
      <div class="col-md-6">
        <div class="clickableLink" v-on:click="onClearbasketlines">
          <div class="disinlineflex">
            <div>
              <img class="img-fluid" src="@/assets/delete.png">
            </div>
            <div>Empty shopping basket</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <div class="clickableLink" v-on:click="onCalculattebasket">
          <div class="disinlineflex float-left">
            <div>
              <img class="img-fluid" src="@/assets/available.png">
            </div>
            <div>Show availability</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row margin-bottom-20">
      <div class="col-md-6">
        <div class="clickableLink">
          <div class="disinlineflex">
            <div>
              <img class="img-fluid" src="@/assets/save-order.png">
            </div>
            <div>Use saved order template</div>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <div class="clickableLink">
          <div class="disinlineflex float-left">
            <div>
              <img class="img-fluid" src="@/assets/save.png">
            </div>
            <div>Save as template</div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <button type="button" class="btn btn-shipment">
      Shipment details
      <span class="btn-ico-forward"></span>
    </button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Datepicker from "../Shared/UIHelpers/Date.vue";
export default {
  name: "BasketSummary",
  components: {
    "sana-datepickker": Datepicker
  },

  data() {
    return {
      GlobalDeleveryDate: ""
    };
  },

  computed: {
    ...mapGetters("basket", {
      BasketCount: "getBasketCount",
      CurrentBasketModel: "getCurrentBasketModel",
      CurrentBasket: "getCurrentBasket",
      BasketLines: "getBasketLines"
    }),

    BasketPrices: function() {
      return {
        TotalPrice: this.CurrentBasket ? this.CurrentBasket.TotalPrice : 0,
        TotalPriceExcludingDiscount: this.CurrentBasket
          ? this.CurrentBasket.TotalPriceExcludingDiscount
          : 0,
        TotalPriceExcludingVat: this.CurrentBasket
          ? this.CurrentBasket.TotalPriceExcludingVat
          : 0
      };
    },

    Basketweights: function() {
      return {
        TotalZfWeight: this.CurrentBasket
          ? this.CurrentBasket.TotalZfWeight
          : 0,
        TotalZfGrossWeight: this.CurrentBasket
          ? this.CurrentBasket.TotalZfGrossWeight
          : 0
      };
    }
  },

  methods: {
    onCalculattebasket: function() {
      this.$emit("onUpdateBasket", this.GlobalDeleveryDate);
      this.GlobalDeleveryDate = "";
    },

    onClearbasketlines: function() {
      this.$emit("onClearBasket");
    },

    onDateChange: function(date) {
      if (date && date != null) {
        this.GlobalDeleveryDate = date;
      }
    }
  }
};
</script>

