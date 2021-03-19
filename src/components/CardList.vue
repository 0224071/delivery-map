<style scoped lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "../assets/scss/theme/_food.scss";
.card {
  width: 100%;
}

.block {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 320px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 6px 6px 6px 1px rgb(0 0 0 / 10%);
  &__image {
    width: 100%;
    height: 14rem;
    background-image: url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
    background-position: center;
    background-size: cover;
  }
  &__body {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex-grow: 1;
    &__section {
      width: 100%;
      // color: $primary-color;
    }
  }
}
</style>

<template>
  <div class="p-2">
    <input
      type="search"
      class="form-control"
      v-model.trim="filterString"
      placeholder="請輸入餐品、餐廳名稱"
    >
  </div>
  <div
    class="block my-2"
    v-for="data in dataFiltered"
    :key="data.name"
  >
    <!-- <div class="block__image"></div> -->
    <div class="block__body">
      <div class="block__body__section row">
        <div class="col-12">
          <span class=" tracking-wide text-sm font-bold text-gray-400">
            {{data.info.address}}
          </span>
        </div>
        <div class="col-12"><span class="text-3xl text-gray-900 mr-2">{{data.name}}</span><span @click="selectPos(data.info.location)">
            <i
              class="fa fa-map-marker-alt text-blue-600 text-2xl cursor-pointer"
              aria-hidden="true"
            ></i></span></div>
        <div class="col-12">
          <sapn class="text-gray-600">{{data.rating}}</sapn>
        </div>
      </div>
      <div class="block__body__section row no-gutters border-t border-gray-300">
        <div class="col-6"> <a
            class="btn btn-foodpanda-color w-100 rounded-none"
            @click.prevent="gotoUrl(data.shopUrl)"
          >FoodPanda</a></div>
        <div class="col-6"> <a
            class="btn btn-ubereats-color w-100 rounded-none"
            @click.prevent="gotoUrl(data.shopUrl)"
          >Uber Eats</a></div>
      </div>
      <div class="block__body__section row border-t border-gray-300">

      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    fp_data: {
      default: [],
    },
  },
  data() {
    return {
      filterString: "",
    };
  },
  computed: {
    dataFiltered() {
      if (!this.fp_data) return [];
      return this.fp_data.filter((item) => {
        let name = item.name;
        let menuList = item.menu_list;
        return this.filterString
          ? name.includes(this.filterString) ||
              this.menuFiltered(menuList, this.filterString)
          : true;
      });
    },
    ...mapState("map_module", {
      focusMarker: "focusMarker",
    }),
  },
  watch: {
    focusMarker(newValue) {
      this.filterString = newValue.name;
    },
  },
  methods: {
    gotoUrl(url) {
      window.open(url, "_blank");
    },
    menuFiltered(list, str) {
      return list.some((item) => {
        return item.name.includes(str);
      });
    },

    ...mapMutations("map_module", ["selectPos"]),
  },
};
</script>

