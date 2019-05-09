<template>
  <div>
    <!--   <Header></Header> -->
    <ioo-headder v-bind:SubTitle="'Your Products'"></ioo-headder>
    <div>
      <div>
        <div class="row">
          <div class="col-md-8">
            <basket ref="basketComponentRef"></basket>
          </div>
          <div class="col-md-4">
            <basket-summary
              v-on:onUpdateBasket="hadleUpdateBasket($event)"
              v-on:onClearBasket="handleClearBasket"
            ></basket-summary>
          </div>
        </div>
      </div>
    </div>
    <!--  <div class="footer">
      <div class="footerTop">
        <div class="callUsBlock">
          <img class="img-fluid" alt="Vue logo" src="@/assets/icon-phone.png">
          <span>
            <a href="#">
              Questions?
              Call us +31 15 27 02 350
            </a>
          </span>
        </div>
        <div class="faqBlock">
          <img class="img-fluid" alt="Vue logo" src="@/assets/icon-quation-mark.png">
          <span>
            <a href="#">FAQ / User Guide</a>
          </span>
        </div>
      </div>
      <div class="footerbottom">
        <ul>
          <li>Legal Information</li>
          <li>Impressum</li>
          <li>&#169; ZF Friedrichshafen AG 2018</li>
        </ul>
      </div>
    </div>-->
  </div>
</template>
<script>
import Header from "../components/Shared/header.vue";
import Basket from "../components/Basket/Basket.vue";
import BasketSummary from "../components/Basket/BasketSummary.vue";

export default {
  name: "BasketPage",
  components: {
    "ioo-headder": Header,
    basket: Basket,
    "basket-summary": BasketSummary
  },
  methods: {
    hadleUpdateBasket: function(deleverydate) {
      this.$refs.basketComponentRef.RecalcualteBasket(deleverydate);
    },
    handleClearBasket: function() {
      this.$refs.basketComponentRef.ClearBasketLines();
    }
  }
};
</script>
