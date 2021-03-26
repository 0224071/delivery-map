<template>
  <Aside title="外送查價平台">
    <template v-slot:default="AsideProps">
      <CardList
        :fp_data="fp_data"
        @set-view="setView"
        @select="selectIndex"
        :sticky-top="AsideProps.stickyBodyTop"
      ></CardList>
    </template>
  </Aside>

  <main class="d-flex flex-column">
    <GPS
      top="80"
      right="12"
      @set-view="setView"
    />
    <Map
      class="map"
      :fp_data="fp_data"
      @select="selectIndex"
      ref="map"
    />
  </main>
</template>

<script>
import Map from "./components/Map";
import Aside from "./components/Aside";
import CardList from "./components/CardList";
import GPS from "./components/GPS";

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Map,
    Aside,
    CardList,
    GPS,
  },
  data() {
    return {
      stickyTop: false,
    };
  },
  async mounted() {
    await this.setData();
  },
  computed: {
    //外送資料
    ...mapGetters("fp_module", {
      fp_data: "infoFiltered",
    }),
  },

  methods: {
    ...mapActions("fp_module", {
      setData: "setShopData",
    }),
    ...mapMutations("fp_module", {
      selectIndex: "setIndex",
    }),
    setView(pos) {
      this.$refs.map.setView(pos);
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
  width: 100%;
  height: 100%;
}
main {
  width: 100%;
  height: 100vh;
}
.map {
  flex: 1 0 auto;
  width: 100%;
}
</style>
