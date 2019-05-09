import store from "../store";

class SanaTextManager {
  static getSanaText = (key, defult = "") => {
    const sanatext = store.getters["content/GET_SANA_TEXT"](key);
    if (sanatext) return sanatext.Value;
    return defult;
  };
}

export default SanaTextManager;
