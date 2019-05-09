<template>
  <button class="ioo-btn ioo-btn-default back-btn" v-on:click="onClickBackButton">
    <span class="btn-inner">
      <span class="btn-arrow-left"></span>
      <span class="btn-text" v-text="getSanaTextValue"></span>
    </span>
  </button>
</template>
<script>
export default {
  name: "BackButton",
  props: {
    BtnTextSanaTextKey: {
      type: String,
      required: true
    },
    BtnDefultText: {
      type: String,
      default: "Back"
    }
  },

  mounted() {},
  computed: {
    getSanaTextValue() {
      if (this.BtnTextSanaTextKey) {
        return this.BtnDefultText || "";
      }
      return this.GetSanaText(this.BtnTextSanaTextKey, this.BtnDefultText);
    }
  },
  methods: {
    onClickBackButton() {
      this.$router.go(-1);
    }
  }
};
</script>
