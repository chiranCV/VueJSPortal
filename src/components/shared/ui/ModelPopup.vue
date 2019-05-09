<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalproductSearch"
  >
    <div v-bind:class="ModalDialogCss" role="document">
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModelPopup",
  props: {
    ModalDialogCss: {
      type: String,
      default: "modal-dialog"
    }
  },
  methods: {
    onClose() {
      this.$emit("onPopupColse");
    }
  }
};
</script>
