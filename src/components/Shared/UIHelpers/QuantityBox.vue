<template>
  <!-- v-on:input="updateValue($event.target.value)" -->
  <div class="quantityBoxBlock">
    <input
      type="number"
      name="quantity"
      v-bind:min="Min"
      v-bind:max="Max"
      v-bind:step="Step"
      v-bind:value="this.QuantityModel.Current"
      v-on:blur="updateValue($event.target.value)"
    >
    <span>Pcs</span>
  </div>
</template>
<script>
export default {
  name: "QuantityBox",
  props: {
    QuantityModel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      Min: 0,
      Max: 10,
      Step: 1,
      QuantityValue: null
    };
  },

  mounted() {
    this.processQuantityModel();
  },

  methods: {
    processQuantityModel: function() {
      if (this.QuantityModel) {
        this.Min = this.QuantityModel.Minimum;
        this.Step = this.QuantityModel.Step;
        this.Max = this.QuantityModel.Maximum;
        this.QuantityValue = this.QuantityModel.Current;
      }
    },

    updateValue: function(value) {
      if (this.quantityValue !== value) {
        this.quantityValue = value;
        this.$emit("onQuantityChange", this.quantityValue);
      }
    }
  }
};
</script>

