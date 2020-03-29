<template>
  <div class="root">
    <div class="search-input">
      <b-button @click="getDictionary">get</b-button>
    </div>
    <b-card :header="selectedItem?selectedItem.word:''" class="item-detail">
      <div v-if="selectedItem">{{selectedItem.content}}</div>
    </b-card>
    <div class="search-result">
      <b-list-group>
        <b-list-group-item
          button
          v-for="item in searchResult"
          :key="item.id"
          @click="selectedItem = item"
        >{{item.word}}</b-list-group-item>
      </b-list-group>
    </div>
    <div class="search-input">
      <b-input-group>
        <b-input v-model="keyword" />
        <b-input-group-append>
          <b-button v-if="busy">
            <b-spinner small />
          </b-button>
          <b-button v-else variant="primary" @click="searchDictionary">search</b-button>
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
      keyword: "",
      searchResult: [],
      selectedItem: null,
      busy: false
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
          this.searchResult = result;
        })
        .finally(() => (this.busy = false));
    }
  }
};
</script>

<style scoped>
.root {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.search-input {
  height: 60px;
  padding: 10px;
  background-color: var(--info);
}
.search-result {
  height: calc(50% - 60px);
  overflow-y: scroll;
}
.item-detail {
  height: calc(50% - 60px);
}
.card-body {
  overflow-y: scroll;
}
</style>
