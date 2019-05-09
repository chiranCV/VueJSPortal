<template>
  <div>
    <div class="vnis qty-box-block">
      <input
        type="number"
        v-bind:value="numericValue"
        @keypress="validateInput"
        :class="inputClass"
        :min="min"
        :max="max"
        v-on:blur="onQtyChange($event.target.value)"
        name="quantity"
        v-bind:disabled="isDisabled"
      >
      <div class="quantity-box-pm-ic-block">
        <button @click="increaseNumber" :class="buttonClassI" v-bind:disabled="isDisabled">˄</button>
        <button @click="decreaseNumber" :class="buttonClassD" v-bind:disabled="isDisabled">˅</button>
      </div>
    </div>
    <span class="text-center float-left ioo-clearfix ioo-mt-5 uom-text" v-text="this.UOM"></span>
  </div>
</template>

<script>
export default {
  name: "NumberInputSpinner",
  data() {
    return {
      numericValue: 1,
      timer: null,
      min: 1,
      max: 10,
      step: 1
    };
  },
  props: {
    QuantityModel: {
      type: Object
    },
    mouseDownSpeed: {
      default: 100,
      type: Number
    },
    inputClass: {
      default: "vnis__input",
      type: String
    },
    buttonClassD: {
      default: "vnis__button vnis__button__decrement",
      type: String
    },
    buttonClassI: {
      default: "vnis__button vnis__button__increment",
      type: String
    },
    integerOnly: {
      default: true,
      type: Boolean
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    UOM: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.processQuantityModel();
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    whileMouseDown(callback) {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          callback();
        }, this.mouseDownSpeed);
      }
    },
    increaseNumber() {
      this.numericValue = parseInt(this.numericValue, 10) + this.step;
      this.onQtyChange(this.numericValue);
    },
    decreaseNumber() {
      this.numericValue -= this.step;
      this.onQtyChange(this.numericValue);
    },
    isInteger(evt) {
      // eslint-disable-next-line no-param-reassign
      evt = evt || window.event;
      let key = evt.keyCode || evt.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]/;
      if (!regex.test(key)) {
        // eslint-disable-next-line no-param-reassign
        evt.returnValue = false;
        if (evt.preventDefault) evt.preventDefault();
      }
    },
    isNumber(evt) {
      // eslint-disable-next-line no-param-reassign
      evt = evt || window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31
        && (charCode < 48 || charCode > 57)
        && charCode !== 46
      ) {
        evt.preventDefault();
        return false;
      }
      return true;
    },
    validateInput(evt) {
      if (this.integerOnly === true) {
        this.isInteger(evt);
      } else {
        this.isNumber(evt);
      }
    },
    inputValue(evt) {
      this.numericValue = evt.target.value
        ? parseInt(evt.target.value, 10)
        : this.min;
    },
    processQuantityModel() {
      if (this.QuantityModel) {
        this.min = this.QuantityModel.Minimum;
        this.step = this.QuantityModel.Step;
        this.max = this.QuantityModel.Maximum;
        this.numericValue = this.QuantityModel.Current
          ? this.QuantityModel.Current
          : this.QuantityModel.Minimum;
      }
    },
    onQtyChange(value) {
      this.numericValue = value;
      this.$emit("onQuantityChange", this.numericValue);
    }
  },
  watch: {
    numericValue(val) {
      if (val <= this.min) {
        this.numericValue = parseInt(this.min, 10);
      }
      if (val >= this.max) {
        this.numericValue = parseInt(this.max, 10);
      }
    }
  }
};
</script>
