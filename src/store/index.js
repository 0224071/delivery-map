import { createStore } from "vuex";
import axios from "axios";

const fp_module = {
  state: () => ({
    info: null,
  }),
  mutations: {
    setData(state, { data }) {
      state.info = data;
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
      let newArr = [];
      state.info.forEach((item) => {
        if (item.info.location) {
          item.info.location = item.info.location.split(",");
          newArr.push(item);
        }
      });
      return newArr;
    },
  },
  namespaced: true,
};
const map_module = {
  state: () => ({
    focusMarker: null,
    userPos: null,
  }),
  mutations: {
    selectInfo(state, data) {
      state.focusMarker = data;
    },
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
