<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <div class="input-group date" id="datetimepicker1">
            <input type="text" class="form-control">
            <span class="input-group-addon">
              <span class="glyphicon glyphicon-calendar"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from "jquery";

import "bootstrap/dist/js/bootstrap.min";
// import moment from "moment";

export default {
  name: "Date",
  props: {
    // http://eonasdan.github.io/bootstrap-datetimepicker/Options/
    config: {
      type: Object,
      default: () => {}
    },
    /**
     * You can set this to true when component is wrapped in input-group
     * Note: inline and wrap mode wont work together
     */
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dp: null,
      // jQuery DOM
      elem: null
    };
  },
  mounted() {
    // const g = jQuery("#datetimepicker1").datetimepicker();
  }
};
</script>
