import Vue from "vue";
import Router from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import ProductList from "../components/ProductList/ProductList.vue";
import Basket from "../components/Basket/Basket.vue";
/* import Detail from "../components/Product/Detail.vue";
import Search from "../views/search-page.vue";
import BasketPage from "../views/basket-page.vue"; */

Vue.use(Router);
const Search = () => import(/*webpackChunkName:"Search"*/ "../views/search-page.vue");
const BasketPage = () => import(/*webpackChunkName:"Basket"*/ "../views/basket-page.vue");
const Detail = () => import("../components/Product/Detail.vue");
export default new Router({
  routes: [
    {
      path: "/",
      name: "Search",
      component: Search
    },
    {
      path: "/Products",
      name: "Search",
      component: Search
    },
    {
      path: "/basket",
      name: "Basket",
      component: BasketPage
    },
    {
      path: "/Product/:id",
      name: "Detail",
      component: Detail
    }
  ]
});
