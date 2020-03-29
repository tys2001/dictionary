<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  components: {
  },
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
#app {
  font-family: verdana, "ヒラギノ丸ゴ ProN W4", "Hiragino Maru Gothic ProN",
    "メイリオ", "Meiryo", "ＭＳ Ｐゴシック", "MS PGothic", Sans-Serif;
}
* {
  user-select: none;
}
input {
  user-select: auto;
}
</style>
