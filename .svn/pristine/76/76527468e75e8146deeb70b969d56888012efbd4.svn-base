<template>
  <div v-bind:class="style">{{formattedPrice}}</div>
</template>
<script>
export default {
  name: "PriceLabel",

  props: {
    Currency: {
      type: String
    },
    DecimalPoints: {
      type: Number,
      default: 2
    },
    LanguageCode: {
      type: String,
      default: "en-US"
    },
    Price: {
      type: Number,
      default: 0
    },
    PrimaryPrice: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    formatPrice(price) {
      const formatter = new Intl.NumberFormat(this.LanguageCode, {
        style: "currency",
        currency: this.curenceyId,
        minimumFractionDigits: this.DecimalPoints
      });
      return formatter.format(price);
    }
  },

  computed: {
    formattedPrice() {
      return this.formatPrice(this.Price);
    },
    curenceyId() {
      if (this.Currency !== "") {
        return this.ShopContext
          && this.ShopContext.CommerceContext
          && this.ShopContext.CommerceContext.CurrencyId
          ? this.ShopContext.CommerceContext.CurrencyId
          : "USD";
      }
      return this.Currency;
    },
    style() {
      if (!this.PrimaryPrice) {
        return "gross-price";
      }
      return "";
    }
  }
};
</script>
