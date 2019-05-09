<template>
  <div>
    <button
      :class="['zfbtn ', RoundButton? 'secondryBtnSearchI':'checkInvBtn']"
      type="button"
      data-toggle="modal"
      data-target="#inventoryCheck"
      v-on:click="handleChekcInventoy"
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
        <div class="modal-content">
          <div class="modal-header">
            <h4
              class="modal-title"
            >{{GlobalInventryHeader.ItemNo}}({{ProductType.Title?ProductType.Title:"Standard"}})</h4>
            <h6>{{GlobalInventryHeader.Title}}</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="GlobalInventoryItemSuppliers">
            <table class="popUpTable">
              <thead v-if="(GlobalInventoryItemSuppliers.length >0)">
                <tr>
                  <th>Supplier code</th>
                  <th>Date</th>
                  <th>Supplier stock</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itemsup,index) in GlobalInventoryItemSuppliers" :key="index">
                  <td>{{itemsup.SupplierCode}}</td>
                  <td>{{itemsup.Date}}</td>
                  <td>{{itemsup.Stock}}</td>
                  <td>{{itemsup.Message?itemsup.Message:"dsd"}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "InventoryCheck",
  props: {
    ProductId: {
      type: String,
      required: true
    },
    ProductType: {
      type: Object,
      required: true
    },
    Qty: {
      type: Number,
      required: true
    },
    RoundButton: {
      type: Boolean
      // default: "zfbtn checkInvBtn",
      // required: false
    }
  },
  created() {
    //this.searchProducts({ query: "1", pagesize: 10 });
  },

  data() {
    return {
      IsLoading: false
    };
  },

  methods: {
    ...mapActions("products", {
      fetchglobalinvetory: "fetchProducGlobalInventory"
    }),

    handleChekcInventoy: function() {
      this.IsLoading = true;
      if (this.ProductId) {
        this.fetchglobalinvetory({
          ProductId: this.ProductId,
          ProductType: this.ProductType ? this.ProductType.Id : "-1",
          Qty: this.Qty
        }).then(() => {
          this.IsLoading = false;
        });
      }
    }
  },

  computed: {
    ...mapState("products", {
      globalInventory: state => state.glabalInventory
    }),

    ...mapGetters("products", {
      GlobalInventryHeader: "getGlobalInventryHeader",
      GlobalInventoryItemSuppliers: "getGlobalInventoryItemSuppliers"
    })
  }
};
</script>

