<template>
  <div>
    <span v-bind:class="indicatorColor">{{indicatortext}}</span>
  </div>
</template>
<script>
export default {
  name: "StockIndicator",
  props: {
    StockModel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      indicatorColor: "sIRed",
      indicatortext: "OutOf stock"
    };
  },
  method: {
    getIndicatorColorandtext: function() {
      if (StockModel) {
        if (StockModel.Inventory <= StockModel.StockRange.OutOfStock) {
          indicatorColor = "sIRed";
          indicatortext = "OutOf stock";
        } else if (
          StockModel.Inventory > StockModel.StockRange.OutOfStock &&
          StockModel.Inventory <= StockModel.StockRange.LowStock
        ) {
          indicatorColor = "sIGreen";
          indicatortext = "low stock";
        } else {
          indicatorColor = "sIOrange";
          indicatortext = "In stock";
        }
      }
    }
  }
};
</script>

