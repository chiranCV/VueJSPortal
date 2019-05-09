<template>
  <div>
    <a v-bind:href="url" v-bind:target="target" v-bind:class="css">{{text}}</a>
    <router-link :to="{name:'ProductDetail', params:{id:productId}}"></router-link>
  </div>
</template>
<script>
import { URL } from "url";

export default {
  name: "Link",
  props: {
    text: {
      type: String,
      required: true
    },
    url: {
      type: URL,
      required: true
    },
    target: String,
    css: String
  }
};
</script>
