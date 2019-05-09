<template>
  <div class="row">
    <div class="col-5">
      <h1 class="mb-0 h2" v-text="headerTitle"></h1>
    </div>
    <div class="col-7">
      <div class="float-right d-flex">
        <a href="#" class="online-shop-link-txt">
          <span class="online-shop-link-txt-img">
            <img src="@/assets/arrow-left.svg" class="img-fluid">
          </span>
          <a>
            <span>
              <span
                v-text="this.GetSanaText('IOO_MiniBasket_OnlineShopLink',
            'Online Shop')"
              ></span>
              <br>
              <span v-text="this.GetSanaText('IOO_MiniBasket_Overview',
            'Overview')"></span>
            </span>
          </a>
        </a>
        <div class="dropdown cart-dropdown-container">
          <!-- eslint-disable max-len -->
          <mini-basket v-bind:ItemCount="getBasketCount" v-bind:BasketLines="getMinibasketitems"></mini-basket>
        </div>
        <div class="language-selector-container">
          <language-selector></language-selector>
        </div>
        <div>
          <!-- cusotmer selection block -->
          <customer-selection v-bind:AccountLines="getCurrentAccounts"></customer-selection>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import {
  GET_BASKET_COUNT,
  GET_FRST_THREE_BASKET_ITEMS,
  GET_CURRENT_ACCOUNTS
} from "../../store/getter-types";

import CustomerSelection from "./CustomerSelection.vue";
import MiniBasket from "../basket/MiniBasket.vue";
import LanguageSelector from "./LanguageSelector.vue";

export default {
  name: "AppHeadder",
  components: {
    "customer-selection": CustomerSelection,
    "mini-basket": MiniBasket,
    "language-selector": LanguageSelector
  },
  props: {
    headerTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters("basket", {
      getBasketCount: GET_BASKET_COUNT,
      getMinibasketitems: GET_FRST_THREE_BASKET_ITEMS
    }),
    ...mapGetters("customer", {
      getCurrentAccounts: GET_CURRENT_ACCOUNTS
    })
  }
};
</script>
