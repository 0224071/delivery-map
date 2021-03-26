<style lang="scss" scoped>
.leaflet-control-gps {
  position: fixed;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  z-index: 999;
  background-color: #fff;
  display: block;
  text-align: center;
  text-decoration: none;
  color: black;
  cursor: pointer;
  box-shadow: 0 1px 5px rgb(0 0 0 / 65%);
  border-radius: 50%;
}
</style>
<template>
  <div
    class="leaflet-control-gps"
    :style="postionStyle"
    @click="getPos(setView)"
  >
    <i
      class="fa fa-crosshairs"
      aria-hidden="true"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      default: "auto",
    },
    bottom: {
      default: "auto",
    },
    left: {
      default: "auto",
    },
    right: {
      default: "auto",
    },
  },
  data() {
    return {};
  },
  mounted() {
    //Dom Render Finish
    // this.getPos(this.setView);
  },
  computed: {
    postionStyle() {
      let { top, bottom, left, right } = this;
      return {
        top: Number(top) + "px" || top,
        bottom: Number(bottom) + "px" || bottom,
        left: Number(left) + "px" || left,
        right: Number(right) + "px" || right,
      };
    },
  },
  methods: {
    startGPS() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              resolve(pos);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          reject("瀏覽器不支援");
        }
      });
    },
    getPos(fn = () => {}) {
      this.startGPS()
        .then((res) => {
          fn([res.coords.latitude, res.coords.longitude]);
        })
        .catch((err) => {
          //Error
          console.log(err);
        });
    },
    setView(pos) {
      this.$emit("set-view", pos);
      this.$store.commit("map_module/setUserPos", pos);
    },
  },
};
</script>

