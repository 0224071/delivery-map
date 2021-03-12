<template>

  <div id="map">

  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import { mapActions, mapState } from "vuex";

let mymap = null;
export default {
  props: {},
  data() {
    return {
      currMarker: null,
    };
  },
  async mounted() {
    //初始化地圖
    this.initmap();
    await this.setData();
  },

  computed: {
    //外送資料
    ...mapState("fp_module", ["fp_data"]),
  },

  watch: {
    fp_data(newValue) {
      let markerArr = [];
      const markers = new L.markerClusterGroup();
      newValue
        .map((item) => {
          const center = [...item.info.location.split(",")];

          const customIcon = L.icon({
            iconUrl: require("../assets/foodpanda.png"),
            iconSize: [25, 25],
          });
          const marker = L.marker(
            new L.LatLng(parseFloat(center[0]), parseFloat(center[1])),
            {
              icon: customIcon,
            }
          )
            .bindTooltip(item.name, {
              direction: "top", // right、left、top、bottom、center。default: auto
              sticky: true, // true 跟著滑鼠移動。default: false
              permanent: false, // 是滑鼠移過才出現，還是一直出現
              opacity: 1.0,
            })
            .bindPopup(this.popupTemplate(item));
            marker.info={...item};
          return marker;
        })
        .forEach((item) => {
          markers.addLayer(item);
        });
      mymap.addLayer(markers);
    },
  },
  methods: {
    async initmap() {
      mymap = L.map("map", {
        center: [25.042474, 121.513729],
        // 可以嘗試改變 zoom 的數值
        // 筆者嘗試後覺得 18 的縮放比例是較適當的查詢範圍
        zoom: 18,
      });
      mymap.on("moveend", (e) => {
        var markerList = [];

        mymap.eachLayer(function (layer) {
          if (
            layer instanceof L.Marker &&
            mymap.getBounds().contains(layer.getLatLng())
          ) {
            markerList.push(layer);
          }
        });
        this.currMarker = markerList;
        console.log(markerList);
      });
      await L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20,
        maxNativeZoom: 18,
      }).addTo(mymap);
      document.querySelector(".leaflet-control-attribution").style.display =
        "none";
    },
    popupTemplate(item) {
      let strMenu = "";
      item.menu_list.forEach((m) => {
        strMenu += `<tr>
    <td>${m.name}</td>
    <td>${m.price}</td>
</tr>`;
      });
      strMenu = `
      <table class="table table-bordered">
    <thead>
        <tr>
            <th>品名</th>
            <th>價格</th>
        </tr>
    </thead>
    <tbody>
      ${strMenu}
    </tbody>
</table>`;
      return (
        `<h5>${item.name}</h5>
` + strMenu
      );
    },
    ...mapActions("fp_module", {
      setData: "setShopData",
    }),
  },
};
</script>