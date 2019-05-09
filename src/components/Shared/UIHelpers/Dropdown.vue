<template>
  <div>
    <a class="zfbtn" data-toggle="dropdown">
      <span class="downArrow"></span>
      <div>
        <span>{{SelectedItem?SelectedItem[TextField]:'Select'}}</span>
      </div>
    </a>
    <ul class="dropdown-menu dropdown-menu-right">
      <li v-for="(item,index) in DataList" :key="index">
        <a v-on:click="ChangeSelection(item)">{{item[TextField]}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    DataList: {
      type: Array,
      required: true
    },
    PreSelecteditem: {
      type: Object,
      required: false
    },
    IdField: {
      type: String,
      required: true
    },
    TextField: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      SelectedItem: {}
    };
  },
  created() {
    //this.SelectedItem = this.PreSelecteditem;
    this.ChangeSelection(this.PreSelecteditem, false);
  },

  methods: {
    ChangeSelection(data, emitEvent = true) {
      this.SelectedItem = data;
      if (emitEvent) this.$emit("onChangeSelection", this.SelectedItem);
    }
  }
};
</script>

