import Utils from "./utils/Utils.js";

// 全コンポーネントからアクセスできる共通のstate
// 各コンポーネントは$storeでこのデータにアクセスする
export default {
  // 現在のシーンを保持する (Login/UserRegister/Config/Mypage)
  scene: 'Login',
  // 履歴、集計で表示する現在の年月を保持する
  yearMonth: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
  },
  // メンバーのリストを保持する
  memberList: [],
  // カテゴリのリストを保持する
  categoryList: [],

  loadMemberList() {
    return Utils.httpGet("getMemberList")
      .then(response => {
        this.memberList = response.data;
        this.setStorage("memberList", this.memberList);
      });
  },
  loadCategoryList() {
    return Utils.httpGet("getPayTypeList")
      .then(response => {
        this.categoryList = response.data;
        this.setStorage("categoryList", this.categoryList);
      });
  },
  loadCacheMemberList() {
    const cache = this.getStorage("memberList");
    if (cache) return new Promise((resolve) => {
      this.memberList = cache;
      this.loadMemberList();
      resolve(cache)
    });
    else return this.loadMemberList();
  },
  loadCacheCategoryList() {
    const cache = this.getStorage("categoryList");
    if (cache) return new Promise((resolve) => {
      this.categoryList = cache;
      this.loadCategoryList();
      resolve(cache)
    });
    else return this.loadCategoryList();
  },
  setStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
  },
  getStorage(key) {
    if (localStorage[key]) return JSON.parse(localStorage[key]);
    else return null;
  }
}