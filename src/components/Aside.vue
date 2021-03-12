<template>
  <aside
    class="aside"
    :class="{'aside--open':isOpen}"
  >
    <header class="aside__hedader">
      外送查價地圖
    </header>
    <div class="aside__body">
      <slot></slot>
    </div>
    <div
      class="aside__switch"
      @click="toggle"
      v-show="!isOpen"
    > <i
        class="fa fa-angle-right"
        aria-hidden="true"
      ></i>

    </div>
    <div
      class="aside__switch"
      @click="toggle"
      v-show="isOpen"
    >
      <i
        class="fa fa-angle-left"
        aria-hidden="true"
      ></i>
    </div>
  </aside>

</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
$aside-width: 520px;
$aside__button-width: 25px;
$aside__button-height: 100px;
$aside__button-color: rgba(255, 255, 255, 0.8);
.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: $aside-width;
  transform: translateX(-100%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  transition: transform 0.5s ease 0s;
  &__hedader {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    align-items: center;
  }
  &__body {
    flex: 1 0 100%;
    overflow-y: auto;
  }
  &__switch {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(100%, -50%);
    width: $aside__button-width;
    height: $aside__button-height;
    background-color: $aside__button-color;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  &--open {
    transform: translateX(0);
  }
}
</style>
