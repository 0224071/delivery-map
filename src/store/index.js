import { createStore } from "vuex";
import axios from "axios";
const FP_Module = {
  state: () => ({
    info: null,
    markers: null,
  }),
  mutations: {
    setData(state, { data }) {
      state.info = data;
    },
    setMarkersData(state, { data }) {
      state.markers = data;
    },
  },
  actions: {
    async setShopData({ commit }) {
      let json = await axios.get("./static/result.json");
      let data = json.data;
      commit("setData", { data });
    },
    setMarkersData({ commit }, data) {
      commit("setMarkersData", { data });
    },
  },
  namespaced: true,
};
export default createStore({
  modules: {
    fp_module: FP_Module,
  },
});
