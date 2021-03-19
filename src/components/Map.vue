<template>
  <l-map
    :center="[25.042474, 121.513729]"
    v-model="zoom"
    v-model:zoom="zoom"
    :zoom-animation="true"
    :inertia="true"
    :inertia-deceleration="3000"
    :inertia-max-speed="Infinity"
    :ease-linearity="0.15"
    ref="map"
  >
    <l-control-zoom position="topright">

    </l-control-zoom>
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ref="layer"
      :max-zoom="maxZoom"
    ></l-tile-layer>
    <l-marker
      :lat-lng="userPos"
      v-if="userPos"
    >
      <l-icon :icon-url="iconUrl">

        <l-tooltip>
          目前位置
        </l-tooltip>
      </l-icon>
    </l-marker>
    <l-marker
      v-for="data in fp_data"
      :key="data.name"
      :lat-lng="data.info.location"
      :info="data"
      @click="changeSearch($event,data)"
    >
      <l-icon
        :icon-url="FpIconUrl"
        :icon-size="iconSize"
      />

      <l-tooltip>
        {{ data.name }}
      </l-tooltip>
      <l-popup> lol </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LControlZoom,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
    LControlZoom,
  },
  props: {
    fp_data: { default: [] },
  },
  data() {
    return {
      zoom: 18,
      maxZoom: 19,
      iconWidth: 25,
      iconHeight: 25,
      FpIconUrl: require("../assets/foodpanda.png"),
      UbIconUrl: "",
      MarkerRef: [],
    };
  },

  mounted() {
    //初始化地圖
    this.$nextTick(() => {
      //can modify leaflet Object here
    });
    //拋出
  },
  beforeUpdate() {
    this.MarkerRef = [];
  },
  updated() {},
  computed: {
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    ...mapState("map_module", {
      userPos(state) {
        return state.userPos;
      },
      selectedPos(state) {
        return state.selectedPos;
      },
    }),
  },
  watch: {
    userPos(newValue) {
      console.log(newValue);
      newValue ? this.setView(newValue) : false;
    },
    selectedPos(newValue) {
      console.log(newValue);
      newValue ? this.setView(newValue) : false;
    },
  },
  methods: {
    ...mapActions("fp_module", {
      setMarkers: "setMarkersData",
    }),
    ...mapMutations("map_module", {
      selectInfo: "selectInfo",
    }),
    changeSearch(e, data) {
      this.selectInfo(data);
    },
    setView(pos) {
      console.log(pos);
      this.$refs.map.leafletObject.setView(pos, this.maxZoom, {
        animate: true,
        pan: {
          duration: 1,
        },
      });
    },
  },
};
</script>