<template>
  <div class="root">
    <div class="header-menu">
      <b-badge class="float-right">Build: {{buildTimestamp}}</b-badge>
      <b-button @click="getDictionary">get</b-button>
    </div>
    <b-card
      :header="selectedItem?selectedItem.word:''"
      class="item-detail"
      header-class="font-weight-bold"
    >
      <div v-if="selectedItem">{{selectedItem.content}}</div>
    </b-card>
    <div ref="searchResultList" class="search-result">
      <b-list-group>
        <b-list-group-item
          button
          v-for="item in showResult"
          :key="item.id"
          @click="selectedItem = item"
        >{{item.word}}</b-list-group-item>
        <b-list-group-item
          button
          v-show="showCount < searchResult.length"
          @click="showMore"
          variant="info"
        >...show more</b-list-group-item>
      </b-list-group>
    </div>
    <div class="search-input">
      <b-input-group>
        <b-input v-model="keyword" />
        <b-input-group-append>
          <b-button v-if="busy">
            <b-spinner small />
          </b-button>
          <b-button v-else variant="primary" @click="searchDictionary">
            <b-icon icon="search" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import Utils from "@/utils/Utils.js";
export default {
  components: {},
  name: "Dictionary",
  data() {
    return {
      store: this.$store,
      buildTimestamp: document.documentElement.dataset.buildTimestamp,
      keyword: "",
      searchResult: [],
      selectedItem: null,
      busy: false,
      showCount: 10
    };
  },
  mounted() {},
  methods: {
    getDictionary() {
      Utils.downloadDictionary();
    },
    searchDictionary() {
      if (!this.keyword) return;
      this.busy = true;
      Utils.getItems(this.keyword)
        .then(result => {
          this.showCount = 10;
          this.$refs.searchResultList.scrollTo({ top: 0 });
          this.searchResult = result;
        })
        .finally(() => (this.busy = false));
    },
    showMore() {
      this.showCount += 10;
    }
  },
  computed: {
    showResult() {
      return this.searchResult.slice(0, this.showCount);
    }
  }
};
</script>

<style scoped>
.root {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 60px 0.5fr 0.5fr 60px;
}
.header-menu {
  padding: 10px;
  background-color: var(--info);
}
.item-detail {
  overflow-y: scroll;
}
.search-result {
  overflow-y: scroll;
}
.search-input {
  padding: 10px;
  background-color: var(--info);
}
.card-body {
  overflow-y: scroll;
}
</style>
