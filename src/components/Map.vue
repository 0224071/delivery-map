<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");
.marker-text {
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
  //  color: rgb(26, 26, 26);
  // text-shadow: rgba(26, 26, 26, 0.3) 3px 2px 3px;
  &--active {
    font-size: 18px;
  }
}

.marker-icon {
  opacity: 0.8;
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
    <l-marker :lat-lng="userPos" v-if="userPos">
      <l-tooltip> 目前位置 </l-tooltip>
    </l-marker>
    <!-- 當前選擇 -->
    <l-marker
      :lat-lng="focusMarker.info.location"
      v-if="focusMarker"
      ref="marker"
      :key="focusMarker.name"
    >
      <l-icon>
        <div class="relative">
          <img
            class="marker-icon"
            :src="FpIconUrl"
            alt=""
            :style="iconActiveSize"
          />
        </div>
      </l-icon>
      <l-popup
        ref="popup"
        @ready="
          $nextTick(() => {
            $refs.marker.leafletObject.openPopup();
          })
        "
      >
        {{ focusMarker.name }}
      </l-popup>
    </l-marker>
    <!-- foodpanda -->
    <l-marker
      v-for="data in fp_data"
      :key="data.name"
      :lat-lng="data.info.location"
      :info="data"
      @click="changeSearch($event, data)"
     
    >
      <l-icon>
        <div class="relative" v-show="markerMinZoom < zoom">
          <div class="marker-text" v-show="textMinZoom < zoom">
            {{ data.name }}
          </div>
          <img class="marker-icon" :src="FpIconUrl" alt="" :style="iconSize" />
        </div>
      </l-icon>
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
      // return [this.iconWidth, this.iconHeight];
      return { width: this.iconWidth + "px", height: this.iconHeight + "px" };
    },
    iconActiveSize() {
      // return [this.iconWidth, this.iconHeight];
      return {
        width: this.iconWidth + 10 + "px",
        height: this.iconHeight + 10 + "px",
      };
    },
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    ...mapState("map_module", {
      userPos(state) {
        return state.userPos;
      },
    }),
    ...mapState("map_module", {
      focusMarker: "focusMarker",
    }),
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
      this.$refs.map.leafletObject.setView(pos, this.maxZoom);
    },
    zoomUpdate(newValue) {
      if (this.$refs.marker) {
        //縮小時取消已打開的Popup
        // this.$refs.marker.leafletObject.closePopup();
      }
    },
    isNoSelectThis(pos) {
      if (!this.focusMarker) return true;
      console.log( pos != this.focusMarker.info.location)
      return pos != this.focusMarker.info.location;
    },
  },
};
</script>