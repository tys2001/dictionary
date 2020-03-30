import axios from 'axios'
import Dexie from 'dexie';

export default {
  httpGet(uri, params) {
    return axios.get(
      `https://tyspine.com/service/dictionary/${uri}`,
      {
        params
      }
    )
  },
  httpPost(uri, params) {
    let formParams = new URLSearchParams();
    for (let paramKey in params) {
      formParams.append(paramKey, params[paramKey]);
    }
    return axios.post(
      `https://tyspine.com/service/dictionary/${uri}`,
      formParams
    )
  },
  downloadDictionary() {
    return this.clearTable()
      .then(() => this.getUnit(0));
  },
  getUnit(cursor) {
    return axios
      .get(
        "https://tyspine.com/service/dictionary/getEjDictionary",
        { params: { cursor } }
      )
      .then(response => {
        this.putItems(response.data.result);
        if (response.data.next) this.getUnit(response.data.next);
        else alert("辞書データ取得が完了しました");
      });
  },
  putItems(items) {
    const db = new Dexie("dictionary");
    const version = 1;
    db.version(version).stores({ ej: "id,search_word" });

    return db.transaction("rw", db.ej, () => {
      db.ej.bulkPut(items);
    })
      .catch(error => {
        alert("Error: " + error);
      });
  },
  clearTable() {
    const db = new Dexie("dictionary");
    const version = 1;
    db.version(version).stores({ ej: "id,search_word" });

    return db.transaction("rw", db.ej, () => {
      db.ej.clear();
    })
      .catch(error => {
        alert("Error: " + error);
      });
  },
  getItems(keyword) {
    const db = new Dexie("dictionary");
    const version = 1;
    db.version(version).stores({ ej: "id,search_word" });

    return db.transaction("r", db.ej, () => {
      return db.ej
        .where("search_word")
        .startsWithIgnoreCase(keyword)
        .sortBy("search_word");
    })
      .catch(error => {
        alert("Error: " + error);
      });
  },
}