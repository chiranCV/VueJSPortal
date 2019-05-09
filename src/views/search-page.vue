<template>
  <div>
    <ioo-headder v-bind:SubTitle="'Look now for products'"></ioo-headder>
    <div class="row">
      <div class="col-md-7">
        <sana-searchbox v-bind:ButtonText="'Search'" v-on:onSearch="handleSearch"></sana-searchbox>
      </div>
    </div>

    <div class="row listActionContainer" v-show="SearchResulthadder">
      <div class="col-md-6">
        <p>Search on: brake disc - {{SearchResulthadder.TotalCount}} product(s) found</p>
      </div>
      <div class="col-md-6">
        <div class="viewListGridBlock">
          <ul>
            <li>
              <p class="textView">view</p>
            </li>
            <li>
              <a href="#">
                <img class="img-fluid" src="@/assets/icon-list.png">
              </a>
            </li>
            <li>
              <a href="#">
                <img class="img-fluid" src="@/assets/icon-grid.png">
              </a>
            </li>
          </ul>
        </div>
        <div class="sortByContainer">
          <p>Sort by:</p>

          <div class="dropdown">
            <div class="btn btn-default" data-toggle="dropdown">
              <span>Relevance</span>
              <div class="downArrow"></div>
            </div>
            <ul class="dropdown-menu dropdown-menu-right">
              <li>
                <a href="#">Relevance</a>
              </li>
              <li>
                <a href="#">
                  Item number
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  Item number
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  Product name
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  Product name
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  Basic number
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  Basic number
                  <span>
                    <img class="img-fluid" src="@/assets/arrow-grey-up.svg">
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ProductList ref="productListComponent"></ProductList>
    <div v-show="(isSearchComplete)" class="row bottomContainer">
      <p>Result 1-9 of 186</p>
      <div class="pagginationBlock">
        <ul>
          <li>
            <a href="#">
              <img class="img-fluid" alt="Vue logo" src="@/assets/paggination-left.png">
            </a>
          </li>
          <li>
            <a href="#" class="active">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li class="paginationDots">
            <a href="#">...</a>
          </li>
          <li>
            <a href="#">
              <img class="img-fluid" alt="Vue logo" src="@/assets/paggination-right.png">
            </a>
          </li>
        </ul>
      </div>
      <div class="showByContainer">
        <p>Show:</p>

        <div class="dropdown">
          <div class="btn btn-default" data-toggle="dropdown">
            <span>9</span>
            <div class="downArrow"></div>
          </div>
          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="dottedBorderBlock">
        <span></span>
      </div>
    </div>
    <div class="footer">
      <div class="footerTop">
        <div class="callUsBlock">
          <img class="img-fluid" alt="Vue logo" src="@/assets/icon-phone.png">
          <span>
            <a href="#">
              Questions?
              Call us +31 15 27 02 350
            </a>
          </span>
        </div>
        <div class="faqBlock">
          <img class="img-fluid" alt="Vue logo" src="@/assets/icon-quation-mark.png">
          <span>
            <a href="#">FAQ / User Guide</a>
          </span>
        </div>
      </div>
      <div class="footerbottom">
        <ul>
          <li>Legal Information</li>
          <li>Impressum</li>
          <li>&#169; ZF Friedrichshafen AG 2018</li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Shared/header.vue";
import ProductList from "../components/ProductList/ProductList.vue";
import SearchBox from "../components/Shared/UIHelpers/SearchBox.vue";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "search",
  components: {
    "ioo-headder": Header,
    ProductList,
    "sana-searchbox": SearchBox
  },

  data() {
    return {
      isSearchComplete: false
    };
  },
  methods: {
    handleSearch: function(searchkey) {
      if (searchkey === "") {
        searchkey = "1";
      }
      var searchOptions = { query: searchkey, pagesize: 10 };
      this.$refs.productListComponent.searchProducts(searchOptions);

      this.isSearchComplete = false;
    }
  },

  computed: {
    ...mapGetters("products", {
      SearchResulthadder: "SearchResulthadder"
    })
  }
};
</script>

<style>
</style>
