<template>
  <slot :shops="shops">
  </slot>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      shops: null,
    };
  },
  async mounted() {
    await this.setData();
    this.shops = this.shopData;
    console.log(this.shops)
  },
  methods: {
    ...mapActions("fp_module", {
      setData: "setShopData",
    }),
  },
  computed: {
    ...mapState("fp_module", ["shopData"]),
  },
};
</script>