<template>
  <div>{{FormattedPrice}}</div>
</template>
<script>
export default {
  name: "PriceLabel",
  props: {
    Currency: {
      type: String,
      default: "USD"
    },
    DecialPoints: {
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
    }
  },

  methods: {
    formatPrice: function(price) {
      const formatter = new Intl.NumberFormat(this.LanguageCode, {
        style: "currency",
        currency: this.Currency,
        minimumFractionDigits: this.DecialPoints
      });
      return formatter.format(price);
    }
  },
  /*   watch: {
    Price: function(val) {
      console.log(val);
      //return this.formatPrice(this.Price);
    }
  } */
  computed: {
    FormattedPrice: function() {
      return this.formatPrice(this.Price);
    }
  }
};
</script>

