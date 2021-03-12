<template>
  <main class="d-flex flex-column">

    <FoodPanda>
      <template v-slot:default={locations,shops}>
      <Map class="map" :locs="locations" :shops="shops" />
      </template>
    </FoodPanda>
  </main>

</template>

<script>
import Map from "./components/Map.vue";
import FoodPanda from "./components/FoodPanda.vue";

export default {
  name: "App",
  components: {
    Map,
    FoodPanda,
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
