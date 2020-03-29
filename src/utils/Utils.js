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
  downloadDictionary(cursor) {
    return axios.get(
      "https://tyspine.com/service/dictionary/getEjDictionary",
      { params: { cursor: cursor || 0 } }
    ).then(response => {
      this.putItems(response.data.result);
      if (response.data.next) this.downloadDictionary(response.data.next);
    });
  },
  putItems(items) {
    const db = new Dexie("dictionary");
    const version = 1;
    db.version(version).stores({ ej: "id,word" });

    return db.transaction("rw", db.ej, () => {
      db.ej.bulkPut(items);
    })
      .then(() => {
      })
      .catch(error => {
        alert("Error: " + error);
      });
  },
  getItems(keyword) {
    const db = new Dexie("dictionary");
    const version = 1;
    db.version(version).stores({ ej: "id,word" });

    return db.transaction("rw", db.ej, () => {
      return db.ej.where("word").startsWithIgnoreCase(keyword).limit(20).toArray();
    })
      .catch(error => {
        alert("Error: " + error);
      });
  },
}