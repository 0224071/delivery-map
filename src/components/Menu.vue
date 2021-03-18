<template>
  <div>
    <div
      v-for="item in list"
      :key="item"
      :ref="setMenuRef"
    >
      <h5>{{item.name}}</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>品名</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="meal in item.menu_list"
            :key="meal"
          >
            <td>{{meal.name}}</td>
            <td>{{meal.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    list: {
      default: [],
    },
  },
  data() {
    return {
      menuRefs: [],
    };
  },
  mounted() {},
  updated() {
    this.$nextTick(() => {
      this.setMenuEl(this.menuRefs);
    });
  },
  watch: {
    list() {
      this.menuRefs = [];
    },
  },
  methods: {
    setMenuRef(el) {
      if (el) {
        this.menuRefs.push(el);
      }
    },
    ...mapActions("fp_module", {
      setMenuEl: "setMenuEl",
    }),
  },
};
</script>

<style>
</style>