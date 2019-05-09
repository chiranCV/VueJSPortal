<template>
  <div>
    <div class="row" v-cloak>
      <div class="col-md-6">
        <h2>Welcome to the Online Shop dsds</h2>
        <h2 v-if="(SubTitle !== '')" class="colorPrimary">{{SubTitle}}</h2>
      </div>
      <div class="col-md-6">
        <a href="#" class="onlineShopLinkTxt">
          <span class="onlineShopLinkTxtimg">
            <img src="@/assets/arrow-left.svg" class="img-fluid">
          </span>
          <router-link :to="{ name: 'Search', params: {}}">
            <span>
              Online Shop
              <br>Overview
            </span>
          </router-link>
        </a>
        <div class="dropdown cartDropdownContainer">
          <router-link :to="{ name: 'Basket', params: {}}">
            <button
              class="zfbtn cartBtnI"
              type="button"
              data-toggle="dropdown"
            >{{BasketCount?BasketCount:0}} Products(s)</button>
          </router-link>

          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <p>The following has been added to your shopping basket.</p>
            </li>
            <li>
              <div class="row">
                <div class="col-md-5">
                  <img class="img-fluid" alt="Vue logo" src="@/assets/sm-thumb-img.jpg">
                </div>
                <div class="col-md-7">
                  <p>Brake Disc</p>
                  <div class="colorBlackLight smFont">3311302 029 01 (Standard)</div>
                  <div class="font-weight-bold smFont mt-3">3 Pieces</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button
                    class="zfbtn primaryBtnCheckouti"
                    type="button"
                    data-toggle="dropdown"
                  >Checkout</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="cusInfoBlock">
          <h6>
            Customer 123456
            <img class="iconWarn" src="@/assets/info.svg">
          </h6>
          <div>
            <a href="#" class="zfbtn" data-toggle="dropdown">
              Change
              <span class="downArrow"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <div class="form-group searchBlock">
                  <img class="img-fluid" src="@/assets/search-left.png">
                  <input type="text">
                </div>
              </li>
              <li>
                <ul class="applicationListBlock">
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                  <li>
                    <a href="#">8373940 | Test Company, Division Sweden</a>
                  </li>
                </ul>
              </li>
              <li>
                <button class="zfbtn primaryBtn" type="button">Go to application Overview</button>
              </li>
            </ul>
            <div class="hrSeprator"></div>
            <a href="#">Manage Account</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass">

</style>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "IOO-header",
  props: {
    SubTitle: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters("basket", {
      BasketCount: "getBasketCount"
    })
  }
};
</script>

