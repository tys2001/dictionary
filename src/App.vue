<template>
  <div id="app">
    <Dictionary />
  </div>
</template>

<script>
import Dictionary from "@/components/Dictionary.vue";
export default {
  components: { Dictionary },
  name: "app",
  data() {
    return {
      store: this.$store
    };
  },
  methods: {}
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: verdana, "ヒラギノ丸ゴ ProN W4", "Hiragino Maru Gothic ProN",
    "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", Sans-Serif;
}
* {
  user-select: none;
  overscroll-behavior: none;
}
input {
  user-select: auto;
}
</style>
