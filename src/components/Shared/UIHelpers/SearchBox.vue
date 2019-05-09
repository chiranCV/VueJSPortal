<template>
  <div class="input-group searchContainer">
    <input
      type="text"
      class="form-control"
      placeholder="Product name or item number"
      aria-label="Product name or item number"
      aria-describedby="basic-addon2"
      v-bind:value="quryvalue"
      v-on:input="updateValue($event.target.value)"
    >
    <div class="input-group-append">
      <button class="zfbtn SearchBtnI" type="button" v-on:click="clickSearchButton">Search</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBox",
  props: {
    ButtonText: {
      type: String,
      requred: true
    },
    PlaceHolder: {
      type: String,
      requred: false
    }
  },

  data() {
    return {
      quryvalue: ""
    };
  },

  methods: {
    clickSearchButton: function() {
      this.$emit("onSearch", this.quryvalue);
    },

    updateValue: function(value) {
      this.quryvalue = value;
    }
  }
};
</script>

