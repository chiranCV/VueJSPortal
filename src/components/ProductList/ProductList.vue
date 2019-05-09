 <template>
  <div>
    <div class="loaderBlock" v-if="(IsSerching)">
      <img class="img-fluid" src="@/assets/loading.gif">
    </div>
    <div v-if="(!IsSerching)">
      <div v-for="(item,index) in productList" :key="index">
        <product-line
          v-bind:ProductModel="item.ProductModel"
          v-on:onAddToCart="handleAddToCart(...arguments)"
          v-on:OnChekcInvetory="handleChekcInventoy(...arguments)"
        ></product-line>
      </div>
    </div>

    <!--   <button
      class="zfbtn checkInvBtn"
      type="button"
      data-toggle="modal"
      data-target="#inventoryCheck"
    >Check</button>
    <div
      class="modal fade"
      id="inventoryCheck"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <inventorycheck-popup></inventorycheck-popup>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ProductLine from "./ProductLine.vue";
import InventoryCheck from "../Shared/InventoryCheck.vue";
import { resolve } from "q";

export default {
  name: "ProductList",
  components: {
    "product-line": ProductLine
  },
  /*  props: {
    searchOptions: {
      type: Object,
      required: true
    }
  }, */

  created() {
    this.searchProducts({ query: "1", pagesize: 10 });
  },

  data() {
    return {
      ListItems: {},
      searchOptions: { query: "1", pagesize: 10 },
      IsSerching: false
    };
  },

  methods: {
    ...mapActions("products", {
      fetchproducts: "fetchSearchResult",
      addtobasket: "addProductToBasket"
    }),

    handleAddToCart(ProductModel, type) {
      console.log("Product added to Basket Product:", ProductModel);
      console.log("Product added to Basket Type:", type);
      this.addtobasket({
        ProductModel: ProductModel,
        DeleveryDate: null,
        ProductType: type
      });
    },

    searchProducts: function(searchoptions) {
      console.log(this.productListModel);
      this.searchOptions = searchoptions;
      this.IsSerching = true;
      this.fetchproducts(this.searchOptions).then(
        () => (this.IsSerching = false)
      );
      return true;
    }
  },

  computed: {
    ...mapState("products", {
      productListModel: state => state.ProductList
    }),

    ...mapGetters("products", {
      productList: "getproductListItems",
      SearchResulthadder: "SearchResulthadder"
    })
  }
};
</script>

<style>
</style>


