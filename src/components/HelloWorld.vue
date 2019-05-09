
<template>
  <div>
    <HeaderIOO></HeaderIOO>

    <div class="row pDetailTopContainer">
      <div class="col-md-5 pDetailTLeftBlock">
        <img class="img-fluid" alt="Vue logo" src="@/assets/lg-thumb-img.jpg">
      </div>
      <div class="col-md-7 pDetailTRightBlock">
        <h4>Brake Disk</h4>
        <p>
          <label>Item No.</label> 3311 302 029 01
        </p>
        <span>Net weight: 100 lbs | Gross weight: 110lbs</span>
        <div class="detailPFormBlock">
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Requested delivery date:</label>
            <div class="col-sm-8">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail"
                value="email@example.com"
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Quantity:</label>
            <div class="col-sm-8">
              <div class="disflexContainer">
                <div class="detailPQuantityBoxBlock">
                  <input
                    type="number"
                    name="quantity"
                    v-bind:min="Min"
                    v-bind:max="Max"
                    v-bind:step="Step"
                    v-bind:value="QuantityValue"
                    v-on:input="updateValue($event.target.value)"
                  >
                  <span>Pcs</span>
                </div>
                <div class="detailPDropDownBlock">
                  <span class="listDropDownText">
                    <a href="#" class="zfbtn" data-toggle="dropdown">
                      <span class="downArrow"></span>
                      <div>
                        <span>aaa</span>
                      </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <a href="#">aaa</a>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
          </div>
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
import HeaderIOO from "../components/Shared/header.vue";
import SearchBox from "../components/Shared/UIHelpers/SearchBox.vue";

export default {
  name: "search",
  components: {
    HeaderIOO
    //"sana-searchbox": SearchBox
  },

  methods: {
    handleSearch: function(searchkey) {
      if (searchkey === "") {
        searchkey = "1";
      }
      var searchOptions = { query: searchkey, pagesize: 10 };
      this.$refs.productListComponent.searchProducts(searchOptions);
    }
  }
};
</script>

<style>
</style>
