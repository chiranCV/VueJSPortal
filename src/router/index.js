import Vue from "vue";
import Router from "vue-router";
import Grid from "../components/design/grid.vue";
import ErrorPage from "../components/Error.vue";

Vue.use(Router);
const StyleGuid = () =>
import(/* webpackChunkName:"StyleGuid" */ "../components/style-guid.vue");
const Search = () =>
  import(/* webpackChunkName:"Search" */ "../components/product_list/Search.vue");
const Basket = () =>
import(/* webpackChunkName:"Basket" */ "../components/basket/Basket.vue");
const ProductDetail = () =>
  import(/* webpackChunkName:"ProductDetail" */ "../components/product-detail/ProductDetail.vue");

const router = new Router({
  routes: [
    {
      path: "/",
      name: "StyleGuid",
      component: StyleGuid
    },
    {
      path: "/Search",
      name: "Search",
      component: Search
    },
    {
      path: "/Error",
      name: "Error",
      component: ErrorPage
    },
    {
      path: "/basket",
      name: "Basket",
      component: Basket
    },
    {
      path: "/product",
      name: "Product",
      component: ProductDetail
    },
    {
      path: "/Product/:id",
      name: "Detail",
      component: ProductDetail
    },
    {
      path: "/product-details",
      name: "ProductDetail",
      component: ProductDetail
    },
    {
      path: "/design/grid",
      name: "grid",
      component: Grid
    }
  ]
});

export default router;
