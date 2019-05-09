/* eslint-disable linebreak-style */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./_index.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import SanaTextMixin from "./mixins/sana-text-mixin";
import SiteSettingsMixin from "./mixins/site-settings-mixin";

Vue.config.productionTip = false;
Vue.mixin(SanaTextMixin, SiteSettingsMixin);

new Vue({
  render: h =>
    h(App),
  router,
  store
}).$mount("#ioo-container");
