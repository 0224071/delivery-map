<template>

  <l-map
    :center="[25.042474, 121.513729]"
    v-model="zoom"
    v-model:zoom="zoom"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :options="{maxZoom: maxZoom,maxNativeZoom :maxZoom}"
    ></l-tile-layer>
    <l-marker
      v-for="data in fp_data_Computed"
      :key="data.shopUrl"
      :lat-lng="data.info.location"
      :ref="setMarkerRef"
      :info="data"
    >
      <l-icon
        :icon-url="FpIconUrl"
        :icon-size="iconSize"
      />

      <l-tooltip>
        {{data.name}}
      </l-tooltip>
      <l-popup>
        lol
      </l-popup>
    </l-marker>
  </l-map>

</template>

<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions } from "vuex";
let mymap = null;
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
  },
  props: {
    fp_data: { default: [] },
  },
  data() {
    return {
      zoom: 18,
      maxZoom: 20,
      iconWidth: 25,
      iconHeight: 25,
      FpIconUrl: require("../assets/foodpanda.png"),
      UbIconUrl: "",
      MarkerRef: [],
    };
  },
  updated() {},
  mounted() {
    //初始化地圖
  },
  computed: {
    fp_data_Computed() {
      this.MarkerRef = [];
      console.log(this.MarkerRef);
      if (!this.fp_data) return [];
      return this.fp_data
        .filter((item) => {
          return item.info.location;
        })
        .map((item) => {
          if (item.info.location)
            item.info.location = item.info.location.split(",");
          return item;
        });
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
    markers() {
      this.setMarkers(this.MarkerRef);
      return this.MarkerRef;
    },
  },

  watch: {},
  methods: {
    setMarkerRef(el) {
      if (el) {
        this.MarkerRef.push(el);
      }
    },
    ...mapActions("fp_module", {
      setMarkers: "setMarkersData",
    }),
  },
};
</script>