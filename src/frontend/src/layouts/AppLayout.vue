<template>
  <transition
    name="router-view"
    mode="in-out"
    @after-enter="afterEnter"
  >
    <component :is="layout">
      <slot />
    </component>
  </transition>
</template>

<script>
const mainLayout = "AppLayoutMain";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout || mainLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },

  methods: {
    afterEnter: () => {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.router-view-enter-active {
  transition: transform 0.1s ease-in-out;
  z-index: 2;
  transform: translateX(100%);
}
.router-view-enter-to {
  z-index: 2;
  transform: translateX(0%);
}
.router-view-leave-active {
  z-index: -1;
}
.router-view-leave-to {
  z-index: -1;
}
</style>
