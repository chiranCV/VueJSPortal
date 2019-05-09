<template>
  <div class="row bottom-container" v-show="isPagingShow">
    <div class="col-2">
      <p>
        Result
        <!-- eslint-disable max-len -->
        <span>{{SelectedPageIndexRangeStart}} - {{SelectedPageIndexRangeEnd}} of {{TotalCount}}</span>
      </p>
    </div>
    <div class="col-8 text-center">
      <div class="paggination-block">
        <ul :class="containerClass" v-if="!noLiSurround">
          <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
            <a
              @click="selectFirstPage()"
              @keyup.enter="selectFirstPage()"
              :class="pageLinkClass"
              :tabindex="firstPageSelected() ? -1 : 0"
              v-html="firstButtonText"
            ></a>
          </li>

          <li
            v-if="!(firstPageSelected() && hidePrevNext)"
            :class="[prevClass, firstPageSelected() ? disabledClass : '']"
          >
            <a
              @click="prevPage()"
              @keyup.enter="prevPage()"
              :class="prevLinkClass"
              :tabindex="firstPageSelected() ? -1 : 0"
              v-html="prevText"
            ></a>
          </li>

          <li
            v-for="(page,index) in pages"
            :class="[pageClass, page.selected ?
      activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']"
            v-bind:key="index"
          >
            <a v-if="page.breakView" :class="[pageLinkClass, breakViewLinkClass]" tabindex="0">
              <slot name="breakViewContent">{{ breakViewText }}</slot>
            </a>
            <a v-else-if="page.disabled" :class="pageLinkClass" tabindex="0">{{ page.content }}</a>
            <a
              v-else
              @click="handlePageSelected(page.index + 1)"
              @keyup.enter="handlePageSelected(page.index + 1)"
              :class="pageLinkClass"
              tabindex="0"
            >{{ page.content }}</a>
          </li>

          <li
            v-if="!(lastPageSelected() && hidePrevNext)"
            :class="[nextClass, lastPageSelected() ? disabledClass : '']"
          >
            <a
              @click="nextPage()"
              @keyup.enter="nextPage()"
              :class="nextLinkClass"
              :tabindex="lastPageSelected() ? -1 : 0"
              v-html="nextText"
            ></a>
          </li>

          <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
            <a
              @click="selectLastPage()"
              @keyup.enter="selectLastPage()"
              :class="pageLinkClass"
              :tabindex="lastPageSelected() ? -1 : 0"
              v-html="lastButtonText"
            ></a>
          </li>
        </ul>

        <div :class="containerClass" v-else>
          <a
            v-if="firstLastButton"
            @click="selectFirstPage()"
            @keyup.enter="selectFirstPage()"
            :class="[pageLinkClass, firstPageSelected() ? disabledClass : '']"
            tabindex="0"
            v-html="firstButtonText"
          ></a>
          <a
            v-if="!(firstPageSelected() && hidePrevNext)"
            @click="prevPage()"
            @keyup.enter="prevPage()"
            :class="[prevLinkClass, firstPageSelected() ? disabledClass : '']"
            tabindex="0"
            v-html="prevText"
          ></a>
          <template v-for="(page,index) in pages">
            <a
              v-if="page.breakView"
              :class="[pageLinkClass, breakViewLinkClass, page.disabled ? disabledClass : '']"
              tabindex="0"
              v-bind:key="index"
            >
              <slot name="breakViewContent">{{ breakViewText }}</slot>
            </a>
            <a
              v-else-if="page.disabled"
              :class="[pageLinkClass, page.selected ? activeClass : '', disabledClass]"
              tabindex="0"
              v-bind:key="index"
            >{{ page.content }}</a>
            <a
              v-else
              @click="handlePageSelected(page.index + 1)"
              @keyup.enter="handlePageSelected(page.index + 1)"
              :class="[pageLinkClass, page.selected ? activeClass : '']"
              tabindex="0"
              v-bind:key="index"
            >{{ page.content }}</a>
          </template>
          <a
            v-if="!(lastPageSelected() && hidePrevNext)"
            @click="nextPage()"
            @keyup.enter="nextPage()"
            :class="[nextLinkClass, lastPageSelected() ? disabledClass : '']"
            tabindex="0"
            v-html="nextText"
          ></a>
          <a
            v-if="firstLastButton"
            @click="selectLastPage()"
            @keyup.enter="selectLastPage()"
            :class="[pageLinkClass, lastPageSelected() ? disabledClass : '']"
            tabindex="0"
            v-html="lastButtonText"
          ></a>
        </div>
      </div>
    </div>
    <div class="col-2">
      <div class="show-by-container">
        <p>Show</p>
        <sana-dropdown
          v-bind:DataList="getShowContentperPage"
          IdField="id"
          v-bind:PreSelecteditem="getDefultSelectedpageSize"
          TextField="value"
          DefaultText="3"
          DefaultTextSanaTextKey="IOO_GlobalInventoryCheck_Type_DefaultText"
          v-on:onChangeSelection="handlePageSize"
        ></sana-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import Dropdown from "./Dropdown.vue";

export default {
  name: "Paging",

  // components.
  components: {
    "sana-dropdown": Dropdown
  },

  props: {
    /*   value: {
      type: Number
    }, */
    PageIndex: {
      type: Number,
      default: 0
    },
    InitialPageSize: {
      type: Number,
      default: 9
    },
    TotalCount: {
      type: Number,
      default: 0,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {}
    },
    marginPages: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: "<"
    },
    nextText: {
      type: String,
      default: ">"
    },
    breakViewText: {
      type: String,
      default: "…"
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String,
      default: "pagination-dots"
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      default: "active"
    },
    disabledClass: {
      type: String,
      default: "disabled"
    },
    noLiSurround: {
      type: Boolean,
      default: false
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: "First"
    },
    lastButtonText: {
      type: String,
      default: "Last"
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: 1,
      value: 1,
      pageRange: 5,
      PageSize: 9,
      SelectedPageIndexRangeStart: 0, // +1
      SelectedPageIndexRangeEnd: 9,
      isPagingShow: true
    };
  },

  created() {
    this.PageSize = this.InitialPageSize;
    this.value = this.PageIndex;
    this.SelectedPageIndexRangeEnd = this.PageSize;
  },

  mounted() {
    if (this.PageIndex === 1) {
      this.SelectedPageIndexRangeStart = 1;
      this.SelectedPageIndexRangeEnd = this.PageSize;
    } else {
      this.SelectedPageIndexRangeStart =
        (this.PageIndex - 1) * this.PageSize + 1;
      if (this.PageSize * this.PageIndex > this.TotalCount) {
        this.SelectedPageIndexRangeEnd = this.TotalCount;
      } else {
        this.SelectedPageIndexRangeEnd = this.PageSize * this.PageIndex;
      }
    }
  },

  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  computed: {
    selected: {
      get() {
        return this.value || this.innerValue;
      },
      set(newValue) {
        this.innerValue = newValue;
      }
    },
    getShowContentperPage() {
      return [
        { id: "3", value: 3 },
        { id: "6", value: 6 },
        { id: "9", value: 9 },
        { id: "12", value: 12 }
      ];
    },
    getDefultSelectedpageSize() {
      const pageCollection = this.getShowContentperPage;
      const selectedpage = _.find(
        pageCollection,
        o => o.value === this.PageSize
      );
      return selectedpage || _.nth(pageCollection, 2);
    },
    pageCount() {
      return Math.ceil(this.TotalCount / this.PageSize);
    },
    pages() {
      const items = {};

      // Hide paging section

      if (this.TotalCount < this.PageSize) {
        this.isPagingShow = false;
      } else {
        this.isPagingShow = true;
      }

      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index += 1) {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);
        const setPageItem = index => {
          const page = {
            index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        };
        const setBreakView = index => {
          const breakView = {
            disabled: true,
            breakView: true
          };
          items[index] = breakView;
        };
        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i += 1) {
          setPageItem(i);
        }
        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }
        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }
        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i += 1
        ) {
          setPageItem(i);
        }
        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }
        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }
        // 3rd - loop thru high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i -= 1
        ) {
          setPageItem(i);
        }
      }
      return items;
    }
  },

  methods: {
    handlePageSize(selectedItem) {
      this.PageSize = selectedItem.value;
      this.innerValue = 1;
      this.SelectedPageIndexRangeEnd = this.PageSize;
      this.SelectedPageIndexRangeStart = 1;
      // this.PageIndex = 1;
      this.selected = 1;
      this.$emit("onPageSizeCahnge", this.PageSize);
      // this.handlePageSelected(1);
    },
    handlePageSelected(selected) {
      this.SelectedPageIndexRangeStart = 10;
      if (this.selected === selected) return;
      this.innerValue = selected;
      this.$emit("input", selected);
      this.clickHandler(selected);

      this.$emit("changePageUrl", {
        PageIndex: selected,
        PageSize: this.PageSize
      });
    },

    prevPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.selected + 1);
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(1);
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.pageCount);
    }
  }
};
</script>

<style lang="css" scoped>
a {
  cursor: pointer;
}
</style>
