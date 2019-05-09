<template>
  <sana-model-popup ref="loading_popup">
    <div class="modal-content text-center loading-indicator-popup">
      <div class="popup-title">
        <h6 class="font-bold" v-text="this.HeaderText"></h6>
      </div>
      <span class="loading-indicator-image">
        <!-- <p v-text="this.GetSanaText('IOO_SearchPage_Loading','Loading....')"></p> -->
        <img class="img-fluid" src="@/assets/loading.gif">
      </span>
      <div class="popup-description">
        <h6 class="font-bold" v-text="this.Description"></h6>
      </div>
    </div>
  </sana-model-popup>
</template>
<script>
import $ from "jquery";
import ModelPopup from "./ModelPopup.vue";

export default {
  name: "LoadingPopup",
  components: {
    "sana-model-popup": ModelPopup
  },
  props: {
    HeaderText: {
      type: String,
      required: false
    },
    Description: {
      type: String,
      required: false
    },
    ShowPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PopupOpened: false
    };
  },
  watch: {
    ShowPopup(newValue) {
      if (newValue) {
        if (!this.PopupOpened) {
          this.onShowPopup();
        }
      } else if (this.PopupOpened) {
        this.onHidePopup();
      }
    }
  },

  mounted() {
    if (this.ShowPopup) {
      if (!this.PopupOpened) {
        this.onShowPopup();
      }
    } else if (this.PopupOpened) {
      this.onHidePopup();
    }
  },
  methods: {
    onShowPopup() {
      this.PopupOpened = true;

      const element = this.$refs.loading_popup.$el;
      $(element).modal("show");
    },
    onHidePopup() {
      this.PopupOpened = false;

      const element = this.$refs.loading_popup.$el;
      $(element).modal("hide");
    }
  }
};
</script>
