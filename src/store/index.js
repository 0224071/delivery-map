import { createStore } from "vuex";
import axios from "axios";

const fp_module = {
  state: () => ({
    info: null,
    selectedIndex: null,
  }),
  mutations: {
    setData(state, { data }) {
      state.info = data;
    },
    setIndex(state, index) {
      state.selectedIndex = index;
    },
  },
  actions: {
    async setShopData({ commit }) {
      let json = await axios.get("./static/result.json");
      let data = json.data;
      commit("setData", { data });
    },
  },
  getters: {
    infoFiltered(state) {
      if (!state.info) return []; 

      return state.info.map((item, index) => {
        item.info.location = item.info.location.split(",");
        item.index = index;
        return item;
      });
    },
  },
  namespaced: true,
};
const map_module = {
  state: () => ({
    userPos: null,
  }),
  mutations: {
    setUserPos(state, pos) {
      state.userPos = pos;
    },
  },
  namespaced: true,
};
export default createStore({
  modules: {
    fp_module,
    map_module,
  },
});
