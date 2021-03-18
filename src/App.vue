<template>
  <Aside title="外送查價平台">
    <CardList :fp_markers="fp_markers"></CardList>
  </Aside>
  <main class="d-flex flex-column">

    <Map
      class="map"
      :fp_data="fp_data"
    />

  </main>

</template>

<script>
import Map from "./components/Map";
import Aside from "./components/Aside";
import CardList from "./components/CardList";

import { mapActions, mapState } from "vuex";
export default {
  name: "App",
  components: {
    Map,
    Aside,
    CardList,
  },
  async mounted() {
    await this.setData();
  },
  computed: {
    //外送資料
    ...mapState("fp_module", {
      fp_data: (state) => state.info,
      fp_markers: (state) => state.markers,
    }),
  },

  methods: {
    ...mapActions("fp_module", {
      setData: "setShopData",
    }),
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
