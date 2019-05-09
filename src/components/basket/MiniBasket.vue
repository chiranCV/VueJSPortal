<template>
  <div>
    <button
      class="ioo-btn ioo-btn-default"
      data-toggle="dropdown"
      v-on:mouseover="showbasketPopup = true"
      v-on:mouseleave="showbasketPopup = false"
    >
      <span class="btn-inner">
        <span class="btn-cart"></span>
        <span class="btn-text" v-text="basketItemCountText"></span>
      </span>
    </button>
    <ul
      v-on:mouseover="showbasketPopup = true"
      v-on:mouseleave="showbasketPopup = false"
      class="dropdown-menu dropdown-menu-right"
      v-bind:class="showbasketPopup || basketUpdated ? 'show': ''"
    >
      <li class="ioo-mb-20">
        <p
          class="font-weight-bold"
          v-text="this.GetSanaText('IOO_MiniBasket_ItemTitle',
          'The following has been added to your shopping basket.')"
        ></p>
      </li>
      <li>
        <div v-for="(item,index) in BasketLines" v-bind:Key="index">
          <mini-basketline v-bind:BasketLineModel="item"></mini-basketline>
        </div>
        <div class="row">
          <div class="col-12">
            <!-- TODO: use button UI component -->
            <button class="ioo-btn ioo-btn-primary btn-checkout" data-toggle="dropdown">
              <span class="btn-inner">
                <span
                  class="btn-text"
                  v-text="this.GetSanaText('IOO_MiniBasket_Checkout',
                  'Checkout')"
                ></span>
                <span class="btn-arrow-right"></span>
              </span>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import MinibasketLine from "./MiniBasketLine.vue";

export default {
  name: "MiniBasket",
  components: {
    "mini-basketline": MinibasketLine
  },
  props: {
    ItemCount: {
      type: Number,
      default: 0
    },
    BasketLines: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showbasketPopup: false,
      basketUpdated: false
    };
  },
  watch: {
    ItemCount(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.basketUpdated = true;
        setTimeout(() => {
          this.basketUpdated = false;
        }, 3000);
      }
    }
  },
  computed: {
    basketItemCountText() {
      let sanatext = this.GetSanaText(
        "IOO_MiniBasket_ItemCount",
        "{[itemCount]} Products(s)"
      );
      sanatext = sanatext.replace("{[itemCount]}", this.ItemCount);
      return sanatext;
    }
  }
};
</script>
