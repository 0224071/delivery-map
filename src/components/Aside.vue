
<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "../assets/scss/theme/food";
$aside-width: 520px;
$aside__button-width: 25px;
$aside__button-height: 100px;
$aside__button-color: $primary-color;

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  // background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $primary-color;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $primary-darken-color;
}

.aside {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  transform: translateX(-100%);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  transition: transform 0.5s ease 0s;
  @include media-breakpoint-up(sm) {
    width: $aside-width;
  }
  // &::after {
  //   content: "";
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   height: 85px;
  //   background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
  // }
  &__hedader {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    position: relative;
    clip-path: inset(0px 0px -15px 0px);
    z-index: 2;
    &__close {
      font-size: 1rem;
    }
  }
  &__body {
    flex: 1 0 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
    padding: 0.8rem 1.2rem;
    position: relative;
    &:hover {
      overflow-y: auto;
    }
  }
  &__switch {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(100%, -50%);
    width: $aside__button-width;
    height: $aside__button-height;
    background-color: $aside__button-color;
    opacity: 0.9;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 0px 2px $primary-shadow-color;
    clip-path: inset(-15px -15px -15px 0px);
  }
  &__backbtn {
    position: fixed;
    right: 15px;
    bottom: 5px;
  }
  &--open {
    transform: translateX(0);
  }
  .circle-button {
    width: 40px;
    height: 40px;
    font-weight: 500;
    font-size: 1.3rem;
    color: #000;
    background-color: $primary-lighten-color;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-button:hover {
    background-color: $primary-color;
    box-shadow: 0px 15px 20px $primary-shadow-color;
    color: #fff;
    transform: translateY(-7px);
    opacity: 1;
  }
}
</style>

<template>
  <aside class="aside" :class="{ 'aside--open': isOpen }">
    <header class="aside__hedader" :style="headerShadow">
      <strong class="aside__hedader__title">
        <span>
          {{ title }}
        </span>
      </strong>
      <button class="close aside__hedader__close" @click="isOpen = false">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
    </header>
    <div class="aside__body" ref="body" @scroll="scrollEvent">
      <slot></slot>
    </div>
    <div class="aside__switch" @click="toggle">
      <i
        class="fa"
        :class="{ 'fa-angle-right': !isOpen, 'fa-angle-left': isOpen }"
        aria-hidden="true"
      ></i>
    </div>
    <div
      class="circle-button aside__backbtn"
      @click="gotoTop"
      v-show="scrollTop"
    >
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    title: {
      default: "Aside Title",
    },
  },
  data() {
    return {
      isOpen: true,
      scrollTop: 0,
    };
  },
  computed: {
    headerShadow() {
      return this.scrollTop
        ? { "box-shadow": "0 1px 5px rgba(0, 0, 0, 0.3)" }
        : {};
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    scrollEvent(e) {
      this.scrollTop = e.target.scrollTop;
    },
    gotoTop() {
      this.$refs.body.scrollTop = 0;
    },
  },
};
</script>
