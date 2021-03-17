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
    class="card"
    v-for="(data,index) in dataFiltered"
    :key="data.name+index"
  >
    <div class="card-body">
      <h5 class="card-title test">{{data.name}}</h5>
      <p class="card-text"><i
          class="fa fa-star"
          aria-hidden="true"
        ></i> {{data.rating}}</p>
      <p class="card-text"> {{data.info.address}}</p>
      <a
        href="#"
        class="btn btn-primary"
        @click="gotoUrl(data.shopUrl)"
      >Go somewhere</a>
    </div>
  </div>

</template>

<script>
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
        return this.filterString ? item.name.includes(this.filterString)||this.menuFiltered(item.menu_list,this.filterString) : true;
      });
    },
  },
  watch: {
    fp_data(newValue) {
      console.log(newValue);
    },
  },
  methods: {
    gotoUrl(url) {
      window.location =  window.open(url, '_blank');
       
    },
    menuFiltered(list,str){

       return list.some((item)=>{
         return item.name.includes(str);
       })
    }
  },
};
</script>

<style  lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.card {
  width: 100%;
}
</style>
