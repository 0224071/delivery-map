<template>
  <Aside title="外送查價平台">
    <Card-list :fp_data="fp_data"></Card-list>
  </Aside>

  <main class="d-flex flex-column">
  <GPS
    top="80"
    right="12"
  />
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
import GPS from "./components/GPS";

import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Map,
    Aside,
    CardList,
    GPS,
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
