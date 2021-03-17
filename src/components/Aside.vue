<template>
  <aside
    class="aside"
    :class="{'aside--open':isOpen}"
  >
    <header class="aside__hedader">
      <strong class="aside__hedader__title">
        <span>
          {{title}}
        </span>
      </strong>
      <button
        class="close aside__hedader__close"
        @click="isOpen=false"
      >
        <i
          class="fa fa-times"
          aria-hidden="true"
        ></i>
      </button>
    </header>
    <div
      class="aside__body"
      ref="body"
      @scroll="scrollEvent"
    >
      <slot></slot>
    </div>
    <div
      class="aside__switch"
      @click="toggle"
    > <i
        class="fa"
        :class="{'fa-angle-right':!isOpen,'fa-angle-left':isOpen}"
        aria-hidden="true"
      ></i>

    </div>
    <div class="circle-button aside__backbtn" @click="gotoTop">
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

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
$aside-width: 520px;
$aside__button-width: 25px;
$aside__button-height: 100px;
$aside__button-color: rgba(255, 255, 255, 0.8);
$primary-color: rgb(138, 196, 208);
$primary-darken-color: darken($primary-color, 20%);
$primary-lighten-color: lighten($primary-color, 20%);
$primary-shadow-color: rgba(138, 196, 208,0.4);
$strong-color:rgb(40, 82, 122);
$strong-lighten-color:lighten($strong-color,20%);
$strong-shadow-color:rgba(40, 82, 122,0.4);
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
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
  &__hedader {
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    align-items: center;
    justify-content: space-between;
    &__close {
      font-size: 1rem;
    }
  }
  &__body {
    flex: 1 0 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
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
  &__backbtn{
    position: fixed;
    right: 15px;
    bottom:5px;
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
    opacity:0.9;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-button:hover {
    background-color:$primary-color;
    box-shadow: 0px 15px 20px $primary-shadow-color;
    color: #fff;
    transform: translateY(-7px);
    opacity:1;
  }
}
</style>
