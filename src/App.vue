<template>
  <div id="app" class="app-wrapper">
    <div class="container">
      <div class="zfContainer" v-show="(!dataloading)">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import productapi from "./Api/productApi";

export default {
  name: "app",
  data() {
    return {
      dataloading: false
    };
  },
  created() {
    productapi.searchTemp("81-370-1", 1, 10).then(searchResult => {
      console.log("searchdata", searchResult);
    });
    /* this.dataloading = true;
    this.fetchSanaText().then(() => {
      this.dataloading = false;
    }); */
  },

  mounted() {
    // this.fetchCurentBaket().then();
  },

  methods: {
    ...mapActions("basket", {
      fetchCurentBaket: "fetchCurretbasket",
      fetchSanaText: "fetchSanaText"
    }),

    getBasket: function() {
      alert("call basket");
      this.fetchCurentBaket().then();

      this.$store.commit("increment");
    }
  }
};
</script>

<style lang="scss">
@import "./_index.scss";
</style>
