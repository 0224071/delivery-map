<template>
  <Aside>
    內容放這裡
  </Aside>
  <main class="d-flex flex-column">
    <Map class="map" />
  </main>

</template>

<script>
import Map from "./components/Map";
import Aside from "./components/Aside";
export default {
  name: "App",
  components: {
    Map,
    Aside,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
