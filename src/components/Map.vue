<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");
.marker {
  &__text {
    position: absolute;
    top: 0px;
    left: calc(100% + 5px);
    word-break: keep-all;
    line-height: 15px;
    color: rgb(215, 15, 98);
    text-shadow: rgba(37, 3, 17, 0.6) 0.5px 0.5px 1px;
    font-size: 14px;
    font-weight: 500;
    font-family: "Noto Sans TC", Comic Sans MS;
    opacity: 0.8;
    background-color: #fff;
    padding: 2px;
    //  color: rgb(26, 26, 26);
    // text-shadow: rgba(26, 26, 26, 0.3) 3px 2px 3px;
  }
  &__icon {
    opacity: 0.8;
  }
  &.marker--active {
    .marker__text {
      font-size: 18px;
    }
  }
}
</style>
<template>
  <l-map
    :center="nowPos"
    v-model="zoom"
    v-model:zoom="zoom"
    :zoom-animation="true"
    :inertia="true"
    :inertia-deceleration="3000"
    :inertia-max-speed="Infinity"
    :ease-linearity="0.15"
    @update:zoom="zoomUpdate"
    ref="map"
  >
    <l-control-zoom position="topright"> </l-control-zoom>
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ref="layer"
      :max-zoom="maxZoom"
    ></l-tile-layer>
    <l-marker
      :lat-lng="userPos"
      v-if="userPos"
    >
      <l-tooltip> 目前位置 </l-tooltip>
    </l-marker>

    <!-- foodpanda -->

    <l-marker
      v-for="data in fp_data"
      :key="data.name"
      :lat-lng="data.info.location"
      :info="data"
      @click="select(data,$event);setView(data.info.location)"
    >
      <l-icon>
        <div
          class="marker"
          :class="{'marker--active':data.index===selectedIndex}"
        >
          <div
            class="marker__text"
            v-show="zoom>textMinZoom"
          >
            {{ data.name }}
          </div>
          <img
            class="marker__icon"
            :src="FpIconUrl"
            alt=""
            :style="data.index===selectedIndex?iconActiveSize:iconSize"
          />
        </div>
      </l-icon>
      <l-popup>
        <div>
          {{ data.name }}
        </div>
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
  LTooltip,
  LPopup,
  LControlZoom,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { mapActions, mapState } from "vuex";
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
      markerMinZoom: 8,
      textMinZoom: 17,
      iconWidth: 25,
      iconHeight: 25,
      FpIconUrl: require("../assets/foodpanda.png"),
      UbIconUrl: "",
      nowPos: [25.042474, 121.513729],
    };
  },
  mounted() {
    //初始化地圖
    this.$nextTick(() => {
      //Can modify leaflet Object here
      //監聽地圖變化
      // this.$watch("$refs.map.leafletObject", (newValue) => {
      //   if (newValue) {
      //     //Execute code here
      //   }
      // });
    });
  },

  computed: {
    iconSize() {
      return { width: this.iconWidth + "px", height: this.iconHeight + "px" };
    },
    iconActiveSize() {
      return {
        width: this.iconWidth + 10 + "px",
        height: this.iconHeight + 10 + "px",
      };
    },
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    markerData() {
      if (!this.fp_data) {
        return [];
      }
      return this.fp_data.map((item) => {
        if (this.focusMarker) {
          item.selected = item.info.location === this.focusMarker.info.location;
        } else {
          item.selected = false;
        }
        return item;
      });
    },
    ...mapState("fp_module", ["selectedIndex"]),
    ...mapState("map_module", {
      focusMarker: "focusMarker",
      markers: "markers",
      userPos(state) {
        return state.userPos;
      },
    }),
  },
  methods: {
    ...mapActions("fp_module", {
      setMarkers: "setMarkersData",
    }),
    select(data, e) {
      this.$emit("select", data.index);
    },
    setView(pos) {
      this.$refs.map.leafletObject.setView(pos, this.maxZoom, {
        animate: true,
        pan: {
          duration: 1,
        },
      });
    },
    zoomUpdate(newValue) {
      if (this.$refs.marker) {
        //縮小時取消已打開的Popup
        // this.$refs.marker.leafletObject.closePopup();
      }
    },
  },
};
</script>