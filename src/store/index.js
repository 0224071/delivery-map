import { createStore } from "vuex";
import axios from "axios";
const FP_Module = {
  state: () => ({
    shopData: null,
  }),
  mutations: {
    setData(state, { data }) {
      state.shopData = data;
    },
  },
  actions: {
    async setShopData({ commit }) {
      let json = await axios.get("./static/result.json");
      let data = json.data;
      commit("setData", { data });
    },
  },
  namespaced: true,
};
export default createStore({
  modules: {
    fp_module: FP_Module,
  },
});
